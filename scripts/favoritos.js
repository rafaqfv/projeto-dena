function favorito(span) {
  span.addEventListener('click', () => {
    if (span.innerText === "favorite_border") {
      span.innerText = "favorite";
    } else {
      span.innerText = "favorite_border";
    }
  });
}