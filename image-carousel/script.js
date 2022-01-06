const imgs = document.getElementById("imgs");
const img = document.querySelectorAll("#imgs img");
const rightBtn = document.querySelector(".right");
const leftBtn = document.querySelector(".left");
const dots = document.getElementById("dots");

img.forEach(() => createDot());

function createDot() {
  const dot = document.createElement("div");
  dot.classList.add("dot");

  dots.appendChild(dot);
}

dots.childNodes[0].classList.add("active");

let idx = 0;

let interval = setInterval(runCarousel, 2000);

rightBtn.addEventListener("click", translateRight);
leftBtn.addEventListener("click", translateLeft);

function runCarousel() {
  idx++;
  changeImage();
}

function translateRight() {
  idx++;
  changeImage();
  resetInterval();
}

function translateLeft() {
  idx--;
  changeImage();
  resetInterval();
}

function changeImage() {
  if (idx > img.length - 1) {
    idx = 0;
  } else if (idx < 0) {
    idx = img.length - 1;
  }

  if (x.matches) {
    imgs.style.transform = `translate(${-idx * 100}vw)`;
  } else {
    imgs.style.transform = `translate(${-idx * 500}px)`;
  }

  dots.childNodes.forEach((dot) => dot.classList.remove("active"));
  dots.childNodes[idx].classList.add("active");
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(runCarousel, 2000);
}

let x = window.matchMedia("(max-width: 500px)");
