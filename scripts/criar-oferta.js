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

function armazenaItem(
  itemName,
  itemCategoria,
  itemPreco,
  itemFavorito = false
) {
  const items = JSON.parse(localStorage.getItem("items")) || [];

  const item = {
    nome: itemName,
    categoria: itemCategoria,
    preco: itemPreco,
    favorito: itemFavorito,
  };

  const index = items.findIndex((i) => i.nome === itemName);

  if (index !== -1) {
    items[index] = item;
  } else {
    items.push(item);
  }

  console.log(item);

  localStorage.setItem("items", JSON.stringify(items));
}

window.addEventListener("load", () => {
  const items = JSON.parse(localStorage.getItem("items") || []);

  items.forEach((item) => {
    arrayProducts.appendChild(pegaItem(item.nome, item.preco, item.categoria));
  });
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

  const item = {
    nome: itemName,
    categoria: itemCategoria,
    preco: itemPreco,
    favorito: false,
  };

  const span = criaFavorito(item);
  li.appendChild(span);

  armazenaItem(itemName, itemCategoria, itemPreco);

  return li;
}

function pegaItem(itemName, itemPreco, itemCategoria) {
  const items = JSON.parse(localStorage.getItem("items") || []);

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

function favorito(span, item) {
  span.addEventListener("click", () => {
    if (span.innerText === "favorite_border") {
      span.innerText = "favorite";
      item.favorito = true;
      adicionarFavorito(item);
    } else {
      span.innerText = "favorite_border";
      item.favorito = false;
      removeFavorito(item);
    }
  });
}

function adicionaFavorito(item) {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos.push(item);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function removeFavorito(item) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos.filter((i) => i.nome !== item.nome);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function criaFavorito(item) {
  const span = criaElemento(
    "span",
    ["material-icons", "favorite"],
    item.favorito ? "favorite" : "favorite_border"
  );
  favorito(span);
  return span;
}
