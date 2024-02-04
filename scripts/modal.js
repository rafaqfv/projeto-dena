const updateForm = document.getElementById("updateForm");
const createForm = document.getElementById("formAdd");
const btnUpdate = document.getElementById("update");
const btnCreate = document.getElementById("create");
const modalNav = document.getElementById("modalNav");
const modal = document.getElementById("modal");
const x = document.getElementById("x");
createForm.style.display = "none";
updateForm.style.display = "none";
modalNav.style.display = "none";

document.getElementById("openModalBtn").addEventListener("click", () => {
  modal.showModal();
});

btnUpdate.addEventListener("click", () => {
  updateForm.style.display = "block";
  modalNav.style.display = "none";
});
btnCreate.addEventListener("click", () => {
  createForm.style.display = "block";
  modalNav.style.display = "none";
});

modal.addEventListener("close", () => {
  modalNav.style.display = "flex";
  updateForm.style.display = "none";
  createForm.style.display = "none";
});

x.addEventListener("click", () => {
  modal.close();
});

// TODO: Fazendo a autenticação

{
  /* <form action="dialog" id="auth-guard">
      <input type="password" placeholder="Senha">
      <input type="submit" value="Entrar" id="authBtn">
     </form> */
}

const auth = firebase.auth();
const formAuthGuard = document.getElementById("auth-guard");
const senha = document.getElementById("authKey");
const authBtn = document.getElementById("authBtn");
const email = "dena@gmail.com";

authBtn.addEventListener("click", () => {
  const valorSenha = senha.value.trim();
  const loading = document.getElementById("loadingAuth");
  if (!valorSenha) return alert("Digite a senha");
  loading.style.display = "block";
  loading.style.color = "black";
  loading.innerText = "Carregando...";

  firebase
    .auth()
    .signInWithEmailAndPassword(email, valorSenha)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      formAuthGuard.style.display = "none";
      modalNav.style.display = "flex";

      // ...
    })
    .catch((error) => {
      var errorCode = error;
      var errorMessage = error.message;
      console.error("Erro:", errorCode, errorMessage);
      loading.style.color = "red";
      loading.innerText = "Senha inválida!";
    });
});
