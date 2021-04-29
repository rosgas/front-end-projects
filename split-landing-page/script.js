const leftPage = document.querySelector('.left-page')
const rightPage = document.querySelector('.right-page')
const landingPages = document.querySelector('.landing-pages')

leftPage.addEventListener('mouseenter', () => {
  landingPages.classList.add('hover-left')
})
leftPage.addEventListener('mouseleave', () => {
  landingPages.classList.remove('hover-left')
})

rightPage.addEventListener('mouseenter', () => {
  landingPages.classList.add('hover-right')
})
rightPage.addEventListener('mouseleave', () => {
  landingPages.classList.remove('hover-right')
})