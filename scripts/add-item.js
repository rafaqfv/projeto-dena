const addItemModal = document.getElementById("addItemModal");
const openModalBtn = document.getElementById("openModalBtn");
const arrayProducts = document.getElementById("arrayProducts");

openModalBtn.addEventListener("click", function () {
  addItemModal.showModal();
});

addItemModal.addEventListener("close", function () {
  document.getElementById("itemCategoria").value = "";
  document.getElementById("itemPreco").value = "";
  document.getElementById("itemName").value = "";
});

addItemModal.addEventListener("submit", function (event) {
  arrayProducts.appendChild(criaProduto());
  event.preventDefault();
  addItemModal.close();
});

addItemModal.addEventListener("reset", function () {
  addItemModal.close();
});

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

function criaDetalhesProduto(itemName, itemCategoria, itemPreco) {
  const div = criaElemento("div", ["product-details"]);

  const h2 = criaElemento("h2", null, itemName);
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
    Number(itemPreco + (itemPreco * 0.2))
      .toFixed(2)
      .replace(".", ",");
  divPrice.appendChild(h4);
  divPrice.appendChild(h3);

  const span = document.createElement("span");
  span.classList.add("material-icons");
  span.classList.add("favorite");
  span.innerHTML = "favorite_border";
  div.appendChild(span);
  favorito(span);

  return div;
}

function criaProduto(itemName, itemPreco, itemCategoria) {
  itemName = document.getElementById("itemName").value.trim();
  itemPreco = document.getElementById("itemPreco").value.trim();
  itemCategoria = document.getElementById("itemCategoria").value.trim();

  const li = criaElemento("li", ["product-item"]);

  const img = criaImagem();
  li.appendChild(img);

  const detalhesProduto = criaDetalhesProduto(
    itemName,
    itemCategoria,
    itemPreco
  );
  li.appendChild(detalhesProduto);

  return li;
}
