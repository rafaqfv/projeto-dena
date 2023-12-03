const db = firebase.firestore();
const updateNome = document.getElementById("updateName");
const novoNome = document.getElementById("newName");
const updateCategoria = document.getElementById("updateCategoria");
const updatePreco = document.getElementById("updatePreco");
const updateItemBtn = document.getElementById("updateItemBtn");
const updateNow = document.getElementById("updateNow");

// CSS IN JS
novoNome.style.textTransform = "capitalize";
updateCategoria.style.textTransform = "capitalize";
updateNome.style.textTransform = "capitalize";

document.getElementById("modal").addEventListener("close", () => {
  updateCategoria.style.display = "none";
  updatePreco.style.display = "none";
  novoNome.style.display = "none";
  document.getElementById('updateName').value = '';
});

updateItemBtn.addEventListener("click", async () => {
  const busca = updateNome.value.trim().toLowerCase();

  if (busca !== "") {
    // Realize a consulta no Firebase Firestore
    const query = db.collection("produtos").where("nome", "==", busca);

    try {
      const querySnapshot = await query.get();

      if (!querySnapshot.empty) {
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
      } else {
        console.log("Nenhum item encontrado com o nome especificado.");
      }
    } catch (error) {
      console.error("Erro ao realizar a consulta:", error);
    }
  }
});

// Event listener para o botão de atualização
updateNow.addEventListener("click", async () => {
  // Realize a consulta novamente para obter a referência do documento
  const busca = updateNome.value.trim();
  const query = db.collection("produtos").where("nome", "==", busca);

  try {
    const querySnapshot = await query.get();

    if (!querySnapshot.empty) {
      // Obtenha a referência do primeiro documento
      const primeiroItemRef = querySnapshot.docs[0].ref;

      // Atualize os campos de categoria e preço
      const novoCategoria = updateCategoria.value; // Substitua pelo novo valor
      const novoPreco = updatePreco.value; // Substitua pelo novo valor
      const newName = novoNome.value;

      // Atualize os campos no Firestore
      await primeiroItemRef.update({
        nome: newName,
        categoria: novoCategoria,
        preco: novoPreco,
      });

      console.log("Item atualizado com sucesso!");
    } else {
      console.log("Nenhum item encontrado com o nome especificado.");
    }
  } catch (error) {
    console.error("Erro ao realizar a consulta:", error);
  }
});
