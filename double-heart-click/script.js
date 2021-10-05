const loveMe = document.querySelector('.love-me')
const times = document.querySelector('.times')
const heartTimes = document.querySelector('.far')

let clickTime = 0
let timesClicked = 0

loveMe.addEventListener('click', (e) => {
  if(clickTime === 0){
    clickTime = new Date().getTime()
  } else {
    if((new Date().getTime() - clickTime) < 500){
      createHeart(e)
      heartTimes.classList.add('animation')
      setTimeout(() => heartTimes.classList.remove('animation'), 1000)
      clickTime = 0
    } else {
      clickTime = new Date().getTime()
    }
  } 
})

const createHeart = (e) => {
  const heart = document.createElement('i')
  heart.classList.add('fas')
  heart.classList.add('fa-heart')

  const x = e.clientX
  const y = e.clientY

  const loveMeLeft = loveMe.offsetLeft
  const loveMeTop = loveMe.offsetTop

  const xInside = x - loveMeLeft
  const yInside = y - loveMeTop

  heart.style.top = `${yInside}px`
  heart.style.left = `${xInside}px`

  loveMe.appendChild(heart)

  times.innerHTML = ++timesClicked
}

