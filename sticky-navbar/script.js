// Media queries/Fix navigation bar 

let mqls = [
  window.matchMedia('(min-width: 500px)'),
  window.matchMedia('(max-width:500px)')
]

function mediaqueryresponse(){
  if(mqls[0].matches){
    window.addEventListener('scroll', fixNav)
  }
  if(mqls[1].matches){
    window.addEventListener('scroll', fixSmallNav)
  }
}

for (var i=0; i<mqls.length; i++){ 
  mediaqueryresponse(mqls[i]) 
  mqls[i].addListener(mediaqueryresponse) 
}

function fixNav() {
  const navbar = document.getElementById('navbar')

  if(window.scrollY > navbar.offsetHeight + 150){
    navbar.classList.add('active')
  } else {
    navbar.classList.remove('active')
  }

}
function fixSmallNav() {
  const navbarSmall = document.getElementById('navbar-small')

  if(window.scrollY > navbarSmall.offsetHeight + 150){
    navbarSmall.classList.add('active')
  } else {
    navbarSmall.classList.remove('active')
  }
}