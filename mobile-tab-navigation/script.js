const pages = document.querySelectorAll(".page-content");
const listItems = document.querySelectorAll("nav ul li");

listItems.forEach((item, idx) => {
  item.addEventListener("click", () => {
    hideAllPages();
    deactiveAllItems();

    item.classList.add("active");
    pages[idx].classList.add("show");
    setTimeout(pageFadeIn, 100);

    function pageFadeIn() {
      pages[idx].classList.add("fade-in");
    }
  });
});

function hideAllPages() {
  pages.forEach((page) => {
    page.classList.remove("show");
    page.classList.remove("fade-in");
  });
}
function deactiveAllItems() {
  listItems.forEach((item) => item.classList.remove("active"));
}
