const inputSearch = document.getElementById("inputSearch");

inputSearch.addEventListener("input", searchItems);

function searchItems() {
  const searchTerm = inputSearch.value.toLowerCase();

  const allItems = document.querySelectorAll(".product-item");

  allItems.forEach((item) => {
    const title = item.querySelector("h2").textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}
