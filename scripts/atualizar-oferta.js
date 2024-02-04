// * Este arquivo altera informações e deleta itens

const db = firebase.firestore();
const updateNome = document.getElementById("updateName");
const novoNome = document.getElementById("newName");
const updateCategoria = document.getElementById("updateCategoria");
const updatePreco = document.getElementById("updatePreco");
const updateItemBtn = document.getElementById("updateItemBtn");
const updateNow = document.getElementById("updateNow");
const deleteItemBtn = document.getElementById("deleteItemBtn");
const loadingDados = document.getElementById("loadingDados");

// CSS IN JS
novoNome.style.textTransform = "capitalize";
updateCategoria.style.textTransform = "capitalize";
updateNome.style.textTransform = "capitalize";

document.getElementById("modal").addEventListener("close", () => {
  updateCategoria.style.display = "none";
  updatePreco.style.display = "none";
  novoNome.style.display = "none";
  document.getElementById("updateName").value = "";
});

updateItemBtn.addEventListener("click", async () => {
  const busca = updateNome.value.trim().toLowerCase();

  if (busca === "") return;
  // Realize a consulta no Firebase Firestore
  const query = db.collection("produtos").where("nome", "==", busca);

  try {
    const querySnapshot = await query.get();

    if (querySnapshot.empty)
      alert("Nenhum item encontrado com o nome especificado.");
    // Se houver resultados, obtenha a referência do primeiro documento
    const primeiroItem = querySnapshot.docs[0].data();

    // Exiba os campos de categoria e preço
    updateCategoria.style.display = "block";
    updatePreco.style.display = "block";
    novoNome.style.display = "block";

    // Preencha os campos com os dados do item
    updateCategoria.value = primeiroItem.categoria;
    updatePreco.value = primeiroItem.preco;
    novoNome.value = primeiroItem.nome;

    // Habilita o botão de atualização
    updateNow.disabled = false;
  } catch (error) {
    console.error("Erro ao realizar a consulta:", error);
  }
});

// Event listener para o botão de atualização do item
updateNow.addEventListener("click", async () => {
  // Realize a consulta novamente para obter a referência do documento
  const busca = updateNome.value.trim();
  const query = db.collection("produtos").where("nome", "==", busca);

  try {
    const querySnapshot = await query.get();

    if (querySnapshot.empty) return;

    // Obtenha a referência do primeiro documento
    const primeiroItemRef = querySnapshot.docs[0].ref;

    // Atualize os campos de categoria e preço
    const novoCategoria = updateCategoria.value; // Substitua pelo novo valor
    const novoPreco = updatePreco.value; // Substitua pelo novo valor
    const newName = novoNome.value;

    if (!novoCategoria || !novoPreco || !newName)
      return alert("Por favor preencha todos os campos");

    // Atualize os campos no Firestore
    await primeiroItemRef.update({
      nome: newName,
      categoria: novoCategoria,
      preco: novoPreco,
    });

    alert("Item atualizado com sucesso!");
    document.getElementById("modal").close();
  } catch (error) {
    console.error("Erro ao realizar a consulta:", error);
  }
});

// Novo event listener para o botão de exclusão de item
deleteItemBtn.addEventListener("click", async () => {
  const confirmarExclusao = confirm(
    "Tem certeza que deseja excluir este item?"
  );

  if (!confirmarExclusao) return;
  // Realize a consulta novamente para obter a referência do documento
  const busca = updateNome.value.trim();
  const query = db.collection("produtos").where("nome", "==", busca);

  try {
    const querySnapshot = await query.get();

    if (querySnapshot.empty)
      return console.log("Nenhum item encontrado com o nome especificado.");

    // Obtenha a referência do primeiro documento
    const primeiroItemRef = querySnapshot.docs[0].ref;

    // Exclua o documento no Firestore
    await primeiroItemRef.delete();

    alert("Item excluído com sucesso!");

    // Limpe os campos após a exclusão, se desejar
    updateNome.value = "";
    updateCategoria.value = "";
    updatePreco.value = "";
    document.getElementById("modal").close();
  } catch (error) {
    console.error("Erro ao realizar a consulta:", error);
  }
});
