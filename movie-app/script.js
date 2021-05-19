const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=69e4836a184122f2e76014f8a0e24601&page=1'

const IMAGE_PATH = 'https://image.tmdb.org/t/p/w400'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=69e4836a184122f2e76014f8a0e24601&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()

  showMovies(data.results)
}


function showMovies(movies) {
  main.innerHTML = ''

  movies.forEach((movie) => {
    const {original_title, poster_path, overview, vote_average} = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML =`
      <div class="img-overview">
        <img class="image" src="${setImage(poster_path)}" alt="${original_title}">
        <div class="overview">
          <h3>Overview</h3>
          <p class="overview-text">${overview}</p>
        </div>
      </div>
      <div class="movie-info">
        <h3>${original_title}</h3>
        <span class="${getClassByRate(vote_average)}"><i class="fas fa-star"></i>${vote_average}</span>
      </div>`

    main.appendChild(movieEl)

  })
}

function setImage(image) {
  if (image !== null){
    return `${IMAGE_PATH + image}`
  } else {
    return '/no-image.jpeg'
  }
}

function getClassByRate(vote){
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5){
    return 'yellow'
  } else {
    return 'red'
  }
}


// Search functionality

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm !== ''){
    getMovies(SEARCH_API + searchTerm)

    search.value = ''
  } else {
    window.location.reload
  }
})