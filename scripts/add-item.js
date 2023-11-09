document.addEventListener('DOMContentLoaded', function() {
var addItemModal = document.getElementById("addItemModal");
var openModalBtn = document.getElementById("openModalBtn");
var itemName = document.getElementById("itemName");
var itemPreco = document.getElementById("itemPreco");
var itemCategoria = document.getElementById("itemCategoria");
const arrayProducts = document.getElementById('arrayProducts');

openModalBtn.addEventListener("click", function () {
  addItemModal.showModal();
});

addItemModal.addEventListener("close", function () {
  // Limpar o campo de entrada quando o modal é fechado
  itemName.value = "";
});

addItemModal.addEventListener("submit", function (event) {
  // Adicionar lógica para lidar com o item adicionado aqui
  addNovoProduto();
  event.preventDefault();
});

addItemModal.addEventListener("reset", function () {
  // Fechar o modal ao clicar no botão "Cancelar"
  addItemModal.close();
});

function addNovoProduto() {
  try {
    const name = itemName.value.trim();
    const categoria = itemCategoria.value.trim();
    const preco = parseFloat(itemPreco.value);
    
    const li = document.createElement('li');
  
    const img = document.createElement('img');
    img.setAttribute('src', 'img/rommanelcolar.webp');
    li.appendChild(img);
  
    const div = document.createElement('div');
    div.classList.add('product-details');
    li.appendChild(div);
  
    const h2 = document.createElement('h2');
    h2.textContent = name;
    div.appendChild(h2);
  
    const p = document.createElement('p');
    p.textContent = categoria;
    div.appendChild(p);
  
    const divPrice = document.createElement('div');
    divPrice.classList.add('price-info');
    div.appendChild(divPrice);
  
    const h4 = 124.99;
    const h3 = document.createElement('h3');
    h3.textContent = preco;
    divPrice.appendChild(h3);
  
  
    const span = document.createElement('span');
    span.classList.add('material-icons favorite');
    span.innerHTML = 'favorite_border';
    div.appendChild(span);
  
    arrayProducts.appendChild(li);
    addItemModal.close();
  } catch (error) {
    console.log(error);
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
});