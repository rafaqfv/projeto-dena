var addItemModal = document.getElementById("addItemModal");
var openModalBtn = document.getElementById("openModalBtn");
const arrayProducts = document.getElementById("arrayProducts");
const arrayCart = document.getElementById('arrayCart')

openModalBtn.addEventListener("click", function () {
  addItemModal.showModal();
});

addItemModal.addEventListener("close", function () {
  // Limpar o campo de entrada quando o modal é fechado
  itemName.value = "";
});

addItemModal.addEventListener("submit", function (event) {
  // Adicionar lógica para lidar com o item adicionado aqui
  addNovoProduto(arrayProducts);
  event.preventDefault();
});

addItemModal.addEventListener("reset", function () {
  // Fechar o modal ao clicar no botão "Cancelar"
  addItemModal.close();
});

function addNovoProduto(array) {
  try {
    const itemName = document.getElementById("itemName").value.trim();
    const itemPreco = Number(document.getElementById("itemPreco").value.trim());
    const itemCategoria = document.getElementById("itemCategoria").value.trim();

    const li = document.createElement("li");
    li.classList.add("product-item");

    const img = document.createElement("img");
    img.setAttribute("src", 'img/rommanelcolar.webp');
    li.appendChild(img);

    const div = document.createElement("div");
    div.classList.add("product-details");
    li.appendChild(div);

    const h2 = document.createElement("h2");
    h2.textContent = itemName;
    div.appendChild(h2);

    const p = document.createElement("p");
    p.textContent = itemCategoria;
    div.appendChild(p);

    const divPrice = document.createElement("div");
    divPrice.classList.add("price-info");
    div.appendChild(divPrice);

    const h4 = document.createElement('h4');
    const h3 = document.createElement("h3");
    h3.textContent = 'R$ '+Number(itemPreco);
    h4.textContent = 'R$ '+Number((itemPreco + (itemPreco * 0.2))).toFixed(2).replace('.', ',');
    divPrice.appendChild(h4);
    divPrice.appendChild(h3);

    const span = document.createElement("span");
    span.classList.add("material-icons");
    span.classList.add("favorite");
    span.innerHTML = "favorite_border";
    div.appendChild(span);

    favorito(span);

    array.appendChild(li);
    addItemModal.close();
  } catch (error) {
    console.error(error);
  }

  // <li class="product-item">
  //   <img src="img/rommanelcolar.webp" alt="Pingente de borboleta" />
  //   <div class="product-details">
  //     <h2>Pingente borboleta de prata com zircônias</h2>
  //     <p>Rommanel - pingente</p>
  //     <div class="price-info">
  //       <h4>224</h4>
  //       <h3>199,90</h3>
  //       <span class="material-icons favorite">favorite_border</span>
  //     </div>
  //   </div>
  // </li>;
}
