const db = firebase.firestore();
const docRef = db.collection("produtos");
const docRefCart = db.collection("carrinho");

const addItemModal = document.getElementById("addItemModal");
const arrayProducts = document.getElementById("arrayProducts");

// Event Listeners
document.getElementById("openModalBtn").addEventListener("click", openModal);
addItemModal.addEventListener("close", resetForm);
addItemModal.addEventListener("submit", handleSubmit);
addItemModal.addEventListener("reset", closeAndResetForm);
window.addEventListener("DOMContentLoaded", loadProducts);

// Funções
function openModal() {
  addItemModal.showModal();
}

function resetForm() {
  document.getElementById("itemCategoria").value = "";
  document.getElementById("itemPreco").value = "";
  document.getElementById("itemNome").value = "";
}

async function handleSubmit(event) {
  event.preventDefault();
  const newItem = criaProduto();
  arrayProducts.appendChild(newItem);
  addItemModal.close();
}

function closeAndResetForm() {
  addItemModal.close();
  resetForm();
}

async function loadProducts() {
  const liArray = await getDocs();
  liArray.forEach((li) => {
    arrayProducts.appendChild(li);
  });
}

function criaProduto() {
  const itemNome = document.getElementById("itemNome").value.trim();
  const itemPreco = document.getElementById("itemPreco").value.trim();
  const itemCategoria = document.getElementById("itemCategoria").value.trim();

  const li = criaElemento("li", ["product-item"]);

  const img = criaImagem();
  li.appendChild(img);

  const detalhesProduto = criaDetalhesProduto(
    itemNome,
    itemCategoria,
    itemPreco
  );
  li.appendChild(detalhesProduto);

  const item = {
    id: Date.now().toString(),
    nome: itemNome,
    categoria: itemCategoria,
    preco: parseFloat(itemPreco),
    favorito: false,
  };

  const span = criaFavorito(item);

  docAdd(item);

  li.appendChild(span);

  return li;
}

// Funções Auxiliares
function criaElemento(tag, classes, conteudo) {
  const elemento = document.createElement(tag);
  if (classes) elemento.classList.add(...classes);
  if (conteudo) elemento.textContent = conteudo;
  return elemento;
}

function criaImagem() {
  const img = criaElemento("img");
  img.setAttribute("src", "img/rommanelcolar.webp");
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

function criaFavorito(item) {
  const span = criaElemento(
    "span",
    ["material-icons", "favorite"],
    item.favorito ? "favorite" : "favorite_border"
  );
  favorito(span, item);
  return span;
}

// Funções do Firestore
async function getDocs() {
  const liArray = [];

  try {
    const querySnapshot = await docRef.get();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const li = criaElemento("li", ["product-item"]);

      const img = criaImagem();
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

function docAdd(item) {
  docRef
    .add({
      id: item.id,
      nome: item.nome,
      categoria: item.categoria,
      preco: item.preco,
      favorito: false,
    })
    .then((docRef) => {
      console.log("Documento foi escrito com sucesso! ", docRef.id);
    })
    .catch((error) => {
      console.error("Erro ao adicionar documento: ", error);
    });
}
