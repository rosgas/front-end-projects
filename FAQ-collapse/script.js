const toggles = document.querySelectorAll('.faq-toggle')

toggles.forEach(toggle => {
  
  const faq = toggle.parentNode
  const text = faq.children[1];
  const title = faq.children[0];

  faq.style.height = (title.offsetHeight + 40) + 'px'

  toggle.addEventListener('click', () => {

    faq.classList.toggle('active');
    
    if(faq.classList.contains('active')){
      faq.style.height = (text.offsetHeight + title.offsetHeight + 40) + 'px';
    } else {
      faq.style.height = (title.offsetHeight + 40) + 'px'
    }
     /* 40px is the sum of the padding top & bottom of .faq */
  })
})




    


