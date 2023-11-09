var addItemModal = document.getElementById("addItemModal");
var openModalBtn = document.getElementById("openModalBtn");
var itemInput = document.getElementById("itemInput");

openModalBtn.addEventListener("click", function() {
  addItemModal.showModal();
});

addItemModal.addEventListener("close", function() {
  // Limpar o campo de entrada quando o modal é fechado
  itemInput.value = "";
});

addItemModal.addEventListener("submit", function(event) {
  // Adicionar lógica para lidar com o item adicionado aqui
  var itemValue = itemInput.value;
  if (itemValue) {
    console.log("Item adicionado: " + itemValue);
    // Fechar o modal após adicionar o item
    addItemModal.close();
  }
  event.preventDefault();
});

addItemModal.addEventListener("reset", function() {
  // Fechar o modal ao clicar no botão "Cancelar"
  addItemModal.close();
});
