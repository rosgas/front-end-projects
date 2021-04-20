// Smooth scrolling

const arrow = document.querySelector('.arrow')

arrow.addEventListener('click', smoothscroll)

function smoothscroll(event){
  event.preventDefault() 
  const target = event.currentTarget.getAttribute('href')

  window.scrollTo({
    top: document.querySelector(target).offsetTop,
    behavior: 'smooth'
  })
}

