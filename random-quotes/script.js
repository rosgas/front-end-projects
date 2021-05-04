const quoteEl = document.getElementById('quote')
const quoteBtn = document.getElementById('quote-btn')
const author = document.getElementById('author')

quoteBtn.addEventListener('click', generateQuote)

generateQuote()


// USING ASYNC/AWAIT
async function generateQuote() {

  const config = {
    headers: {
      Accept: 'application/json', 
    },
  }

  const res = await fetch("https://type.fit/api/quotes", config)
  const data = await res.json()
  
  const x = data.length * Math.random() | 0
  if(data[x].text.length < 150 && data[x].author != null){
    quoteEl.innerHTML = " \"" + " " + (data[x].text) + " " + "\"";
    author.innerHTML = "-" + " " + (data[x].author)
  } else {
      generateQuote()
  }
    
  };

  