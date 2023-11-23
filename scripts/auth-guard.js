

const formAdd = document.getElementById("formAdd");

firebase.auth().onAuthStateChanged((user) => {
  !user ? (formAdd.style.display = "none") : (formAdd.style.display = "block");
});
