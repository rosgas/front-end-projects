const button = document.querySelector(".btn");
const boxes = document.getElementById("boxes");

function changeBoxesSize(x) {
  if (x.matches) {
    createSmallBoxes();
  } else {
    createBigBoxes();
  }
}

let x = window.matchMedia("(max-width: 700px)");
changeBoxesSize(x);

function createBigBoxes() {
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`;
      boxes.appendChild(box);
    }
  }
}

function createSmallBoxes() {
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.backgroundPosition = `${-j * 50}px ${-i * 50}px`;
      boxes.appendChild(box);
    }
  }
}

button.addEventListener("click", () => {
  button.classList.add("show");
  setTimeout(() => button.classList.remove("show"), 500);
  setTimeout(() => boxes.classList.add("effect"), 300);
  setTimeout(() => boxes.classList.remove("effect"), 500);
  setTimeout(() => boxes.classList.toggle("big"), 600);
});

window.onresize = function () {
  location.reload();
};
