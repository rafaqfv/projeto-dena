const db = firebase.firestore();
const docRef = db.collection("produtos");
const docRefCart = db.collection("carrinho");
const storage = firebase.storage();

// DOM
const formAdd = document.getElementById("formAdd");
const modal = document.getElementById("modal");
const arrayProducts = document.getElementById("arrayProducts");
const inputSearch = document.getElementById("inputSearch");

// Event Listeners
inputSearch.addEventListener("input", searchItems);
modal.addEventListener("close", resetForm);
modal.addEventListener("submit", handleSubmit);
modal.addEventListener("reset", closeAndResetForm);
window.addEventListener("DOMContentLoaded", loadProducts);
document.addEventListener("DOMContentLoaded", function () {
  const imgItemInput = document.getElementById("imgItem");
  const previewImage = document.getElementById("previewImage");

  imgItemInput.addEventListener("change", function () {
    const file = imgItemInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });
});

// Funções do modal
/**
 * Obtém as informações do formulário
 * @returns {Object} - Objeto com informações do formulário
 */
function getInfo() {
  const itemNome = document
    .getElementById("itemNome")
    .value.trim()
    .toLowerCase();
  const itemPreco = document.getElementById("itemPreco").value.trim();
  const itemCategoria = document.getElementById("itemCategoria").value.trim();
  return { itemNome, itemCategoria, itemPreco };
}

function resetForm() {
  document.getElementById("itemCategoria").value = "";
  document.getElementById("itemPreco").value = "";
  document.getElementById("itemNome").value = "";
  document.getElementById("previewImage").src = "";
}
function closeAndResetForm() {
  modal.close();
  resetForm();
}

/**
 * Esta função pega todas as informações e envia para o firebase
 */
async function handleSubmit(event) {
  event.preventDefault();
  const imageURL = await uploadImage();

  // Obtém as informações
  const info = getInfo();
  const { itemNome, itemPreco, itemCategoria } = info;

  // Verifica se todas as informações são válidas
  if (!itemNome || !itemPreco || !itemCategoria)
    return console.error("Campos obrigatórios não preenchidos.");

  // Adiciona o documento ao Firestore
  docAdd(imageURL, info);
  alert("Sucesso");
  modal.close();
}

/**
 * Esta função recebe o getDocs() e adiciona os produtos no array de produtos
 */
async function loadProducts() {
  const liArray = await getDocs();
  liArray.forEach((li) => {
    arrayProducts.appendChild(li);
  });
}

// Funções Auxiliares
function criaElemento(tag, classes, conteudo) {
  const elemento = document.createElement(tag);
  if (classes) elemento.classList.add(...classes);
  if (conteudo) elemento.textContent = conteudo;
  return elemento;
}

function criaImagem(URL) {
  const img = criaElemento("img");
  img.setAttribute("src", URL);
  img.setAttribute("loading", "lazy");
  return img;
}

function criaDetalhesProduto(itemNome, itemCategoria, itemPreco) {
  const div = criaElemento("div", ["product-details"]);

  const h2 = criaElemento("h2", null, itemNome);
  div.appendChild(h2);

  const p = criaElemento("p", null, itemCategoria);
  div.appendChild(p);

  const divPrice = criaElemento("div", ["price-info"]);
  div.appendChild(divPrice);

  const h4 = criaElemento("h4");
  const h3 = criaElemento(
    "h3",
    null,
    "R$ " + Number(itemPreco).toFixed(2).replace(".", ",")
  );
  h4.textContent =
    "R$ " +
    parseFloat(Number(itemPreco) + Number(itemPreco) * 0.2)
      .toFixed(2)
      .replace(".", ",");
  divPrice.appendChild(h4);
  divPrice.appendChild(h3);

  const span = criaElemento(
    "span",
    ["material-icons", "favorite"],
    "favorite_border"
  );
  divPrice.appendChild(span);
  favorito(span);

  return div;
}

function favorito(span, item) {
  span.addEventListener("click", () => {
    if (span.innerText === "favorite_border") {
      span.innerText = "favorite";
      item.favorito = true;
    } else {
      span.innerText = "favorite_border";
      item.favorito = false;
    }
  });
}

/**
 * @returns Produtos do firebase
 */
async function getDocs() {
  const liArray = [];

  try {
    const querySnapshot = await docRef.get();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const li = criaElemento("li", ["product-item"]);

      const img = criaImagem(data.url);
      li.appendChild(img);

      const detalhesProduto = criaDetalhesProduto(
        data.nome,
        data.categoria,
        data.preco
      );

      li.appendChild(detalhesProduto);
      liArray.push(li);
    });
  } catch (error) {
    console.log("Erro ao obter documentos: ", error);
  }
  return liArray;
}

/**
 * Precisa do parametro da imagem vinda do uploadImage()
 * @param {string} imageURL
 * @param {Object} info - Informações a serem adicionadas
 */
function docAdd(imageURL, info) {
  docRef
    .add({
      id: Date.now().toString(),
      nome: info.itemNome,
      categoria: info.itemCategoria,
      preco: info.itemPreco,
      url: imageURL,
    })
    .then((docRef) => {
      console.log("Documento foi escrito com sucesso! ", docRef.id);
    })
    .catch((error) => {
      console.error("Erro ao adicionar documento: ", error);
    });
}

function searchItems() {
  const searchTerm = inputSearch.value.toLowerCase();

  const allItems = document.querySelectorAll(".product-item");

  allItems.forEach((item) => {
    const title = item.querySelector("h2").textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

/**
 * Esta função pega o upload da imagem e armazena no firestore e retorna URL
 * @returns {string} URL da imagem
 */
async function uploadImage() {
  // @
  const imgItemInput = document.getElementById("imgItem");
  const file = imgItemInput.files[0];

  if (file) {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`produtos/${file.name}`);

    try {
      await imageRef.put(file);
      const imageURL = await imageRef.getDownloadURL();
      return imageURL;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem: ", error);
      return null;
    }
  } else {
    return null;
  }
}
