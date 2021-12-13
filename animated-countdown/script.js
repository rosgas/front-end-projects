const replayBtn = document.querySelector('.replay')
const finalMsg = document.querySelector('.final')
const counter = document.querySelector('.counter')
const nums = document.querySelectorAll('.nums span')
const lines = document.querySelectorAll('.line')

runAnimation()

function resetDOM() {
  counter.classList.remove('hide')
  finalMsg.classList.remove('show')

  nums.forEach((num) => {
    num.classList.value = ''
  })

  lines.forEach((line) => {
    line.classList.add('flash')
  })

  nums[0].classList.add('in')
}

function runAnimation() {
  nums.forEach((num, idx) => {
    const nextToLast = nums.length - 1

    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== nextToLast) {
        num.classList.remove('in')
        num.classList.add('out')

        lines.forEach((line) => {
          line.classList.remove('flash')
        })
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in')

        lines.forEach((line) => {
          line.classList.add('flash')
        })
      } else {
        counter.classList.add('hide')
        finalMsg.classList.add('show')

        lines.forEach((line) => {
          line.classList.remove('flash')
        })
      }
    })
  })
}

replayBtn.addEventListener('click', resetDOM)
