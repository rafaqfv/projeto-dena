const fav = document.querySelectorAll(".favorite");

fav.forEach((button) => {
  button.addEventListener("click", (event) => {
    const clickedButton = event.target; // Obtém o botão específico que foi clicado

    if (clickedButton.innerText === "heart_plus") {
      clickedButton.innerText = "favorite";
    } else {
      clickedButton.innerText = "heart_plus";
    }
  });
});
