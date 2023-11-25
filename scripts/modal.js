const updateForm = document.getElementById("updateForm");
const createForm = document.getElementById("formAdd");
const btnUpdate = document.getElementById("update");
const btnCreate = document.getElementById("create");
const modalNav = document.getElementById("modalNav");
const modal = document.getElementById("modal");
const x = document.getElementById("x");
createForm.style.display = "none";
updateForm.style.display = "none";

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

x.addEventListener('click', () => {
  modal.close();
});