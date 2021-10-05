const textEl = document.getElementById('text')
const speedSet = document.querySelector('.speed-set')

const text = 'We love programming!'
let idx = 1
let speed = 1

writeText()
speedChanger()

function writeText() {
  textEl.innerText = text.slice(0, idx)
  idx++

  if (idx > text.length) {
    idx = 1
  }

  setTimeout(writeText, 300 / speed)
}

function speedChanger() {
  const decrease = document.getElementById('decrease')
  const increase = document.getElementById('increase')
  const speedEl = document.getElementById('speed')

  function updateSpeed() {
    speedEl.innerText = speed
  }

  decrease.addEventListener('click', () => {
    speed -= 1

    if (speed < 1) {
      speed = 1
    }

    updateSpeed()
  })

  increase.addEventListener('click', () => {
    speed += 1

    if (speed > 5) {
      speed = 5
    }

    updateSpeed()
  })
}

textCenter()

function textCenter() {
  const textEffect = document.getElementById('text-effect')

  const speedSetTop = speedSet.getBoundingClientRect().top
  console.log(speedSetTop)

  textEffect.style.height = `calc(100vh - (100vh - ${speedSetTop}px))`
  console.log(textEffect.style.height)
}
