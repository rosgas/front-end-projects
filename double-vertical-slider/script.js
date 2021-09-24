const slidersContainer = document.querySelector('.sliders-container')
const slidersLeft = document.querySelector('.sliders-left')
const slidersRight = document.querySelector('.sliders-right')
const btnDown = document.querySelector('.down-button')
const btnRight = document.querySelector('.right-button')
const btnUp = document.querySelector('.up-button')
const slidersLength = slidersRight.querySelectorAll('div').length

let activeSlideIndex = 0

let mqls = window.matchMedia('(max-width: 800px)')

function mediaqueryresponse(){
  if (mqls.matches) {
    slidersLeft.style.left = `-${(slidersLength-1)*100}vw`
    btnRight.addEventListener('click', () => moveSliders('right'))
  }
  else {
    slidersLeft.style.top = `-${(slidersLength-1)*100}vh`
    btnUp.addEventListener('click', () => changeSlide('up'))
    btnDown.addEventListener('click', () => changeSlide('down'))
  }
}

const changeSlide = (direction) => {
  const sliderHeigth = slidersContainer.clientHeight
  if (direction ==='up'){
    activeSlideIndex++
    if(activeSlideIndex > slidersLength -1){
      activeSlideIndex = 0
    }
  } else if ( direction === 'down'){
    activeSlideIndex--
    if(activeSlideIndex < 0){
      activeSlideIndex = slidersLength -1
    }
  }

  slidersRight.style.transform = `translateY(-${activeSlideIndex * sliderHeigth}px)`
  slidersLeft.style.transform = `translateY(${activeSlideIndex * sliderHeigth}px)`
}

const moveSliders = (direction) => {
  const sliderWidth = slidersContainer.clientWidth
  if (direction ==='right'){
    activeSlideIndex++
    if(activeSlideIndex > slidersLength -1){
      activeSlideIndex = 0
    }
  } 

  slidersRight.style.transform = `translateX(-${activeSlideIndex * sliderWidth}px)`
  slidersLeft.style.transform = `translateX(${activeSlideIndex * sliderWidth}px)`
}

mediaqueryresponse()

