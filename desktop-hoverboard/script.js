const container = document.getElementById("container");
const colors = [
  "#ffffc3",
  "#ffe1a0",
  "#ffbe91",
  "#ff999b",
  "#df6fde",
  "#caffbf",
  "#7b76ff",
];

const width = window.innerWidth || document.documentElement.clientWidth;

const height = window.innerHeight || document.documentElement.clientHeight;

const b = Math.floor(width / 12);

const h = Math.floor(height / 12);

const SQUARE = b * h;

for (let i = 0; i < SQUARE; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", () => setColor(square));
  square.addEventListener("mouseout", () => removeColor(square));

  container.appendChild(square);
}

function setColor(element) {
  const color = getRandomColor();

  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 1px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
  element.style.backgroundColor = "rgb(39, 36, 36)";
  element.style.boxShadow = `0 0 1px rgb(39, 36, 36) `;
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

window.onresize = function () {
  location.reload;
};
