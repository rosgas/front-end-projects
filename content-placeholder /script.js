const main = document.getElementById('main')
   
// Content Placeholder

function createDiv() {
  const articleEl = document.createElement('div')
  articleEl.classList.add('card')

  articleEl.innerHTML = `
  <div class="card-header animated-bg" id="header"></div>
  <div class="card-content">
    <a href="" target="_blank" class="card-title animated-bg animated-bg-title" id="title" style='color:transparent'>&nbsp;</a>
    <p class="card-excerpt" id="excerpt">
      <span class="animated-bg animated-bg-text">&nbsp;</span>
      <span class="animated-bg animated-bg-text">&nbsp;</span>
      <span class="animated-bg animated-bg-text">&nbsp;</span>
    </p>
    <div class="info">
      <strong class="animated-bg animated-bg-name" id="name" style='color:transparent'>&nbsp;</strong>
      <small class="animated-bg animated-bg-date" id="date" style='color:tansparent'>&nbsp;</small> 
    </div>
  </div>`

  return articleEl 
}

function createDivs(){
  myArticles = []
  i = 0
  numOfArticles = 10

  for (i; i < numOfArticles; i += 1) {
    myArticles.push(createDiv());
    main.appendChild(myArticles[i]);
  }
}

createDivs()

// Get initial news

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()

const API_URL = `https://content.guardianapis.com/search?page=1&q=australia&api-key=e3cb85ef-3a66-49dd-8600-cc7acfb7d335&show-fields=thumbnail,trailText,headline`

getNews(API_URL)

async function getNews(url) {
  const res = await fetch(url)
  const data = await res.json()

  showNews(data.response.results)   
}

function showNews(news){
  main.innerHTML = ''
  
  news.forEach((article) => {
    const fields = article.fields

    const {thumbnail = fields.thumbnail, headline = fields.headline, webUrl, trailText = fields.trailText, sectionName, webPublicationDate} = article
  
    const articleEl = document.createElement('div')
    articleEl.classList.add('card')
        
    articleEl.innerHTML = `
    <div class="card-header" id="header" style='background:url(${thumbnail}) center center/cover'></div>
    <div class="card-content">
      <a href="${webUrl}" target="_blank" class="card-title" id="title" style='color:#313131'>${headline}</a>
      <p class="card-excerpt" id="excerpt">${trailText}.
      </p>
      <div class="info">
        <strong id="name" style='color:rgba(49, 49, 49, 0.9)'>${sectionName}</strong>
        <small id="date" style='color:rgba(49, 49, 49, 0.6)'>${webPublicationDate.split('T')[0]}</small> 
      </div>
    </div>`

    main.appendChild(articleEl)
  } )
}
