const title = document.querySelector(".title")
const gitHubLogoWidth = window.getComputedStyle(title, "after").width
const APIURL = 'https://api.github.com/users/'
const searchBtn = document.querySelector('.btn')
const input = document.querySelector('.input')
const main = document.querySelector('.main')

function centerTitle() {
  const x = gitHubLogoWidth.slice(0, -2)/2
  title.style.transform = `translateX(${x}px)`
}

centerTitle() 

async function getUser(username){
  try {
    const { data } = await axios(APIURL + username)
  
    createUserCard(data)
    getRepos(username)
  } catch (err) {
    if(err.response.status = 404){
      createErrorNotification('No profile with this username')
    }
  } 
}

async function getRepos(username){
  try {
    const { data } = await axios(APIURL + username + '/repos?sort=created')
  
    addReposToCard(data)
  } catch (err) {
    createErrorNotification('Problem fetching repos')
  } 
}

function createUserCard(user) {
  const cardHTML = `
  <div id="card">
    <div class="intro">
      <div class="profile">
        <div class="avatar">
          <img src="${user.avatar_url}" alt="
          ${user.name}" class="avatar-img">
        </div>
        <h2 class="name">${user.name}</h2>
      </div>
      <div class="personal-info">
        <div class="location">
          <i class="fas fa-map-marker-alt"></i>
          <h3>${user.location}</h3>
        </div>
        <div class="email">
          <i class="fas fa-envelope"></i>
          <a href="mailto:${user.email}">Send email</a>
        </div>
      </div>
    </div>
    <p class="bio">${user.bio}</p>
    <div class="github-info">
      <div class="box followers">
        <div class="counter followers-counter" data-target="${user.followers}">${user.followers}</div>
        <h3>Followers</h3>
      </div>
      <div class="box following">
        <div class="counter following-counter" data-target="${user.following}">${user.following}</div>
        <h3>Following</h3>
      </div>
      <div class="box repos">
        <div class="counter repos-counter" data-target="${user.public_repos}">${user.public_repos}</div>
        <h3>Repos</h3>
      </div>
    </div>
    <div id="repos"></div>
    <a class="gitHub-link" href="${user.html_url}" target="_blank"><img src="img/Octocat.png" alt="" width="65px" height="auto"> GitHub account</a>
  </div>`

  main.innerHTML = cardHTML

  // Increment counter
  const counters = main.querySelectorAll(".counter")

  const ticker = (counter,current,target) => {
  counter.innerText = current
  const increment = target / 250

  if (current < target) {
    setTimeout(() => ticker(counter, Math.min(current + Math.ceil(increment), target),target),1) 
  }
  }
  counters.forEach((counter) => {
  ticker(counter,0,counter.getAttribute('data-target'))
})
}

function addReposToCard(repos){
  const reposEl = document.getElementById('repos')

  repos
    .slice(0, 5)
    .forEach(repo => {
    const repoTag = document.createElement('a')
    repoTag.classList.add('tag')
    repoTag.href = repo.html_url
    repoTag.target = '_blanck'
    repoTag.innerText = repo.name

    reposEl.appendChild(repoTag)
  })
}

function createErrorNotification(msg) {
  const notifications = document.getElementById('notifications')
  const notificationEl = document.createElement('div')
  notificationEl.classList.add('notification-box', 'error-box')

  notificationEl.innerHTML = `
  <i class="icon error-icon fas fa-times-circle fa-2x"></i>
  <div class="content">
    <h2 class="title error-title">Error notification</h2>
    <p class="text">${msg}</p>
  </div>`
  
  notifications.appendChild(notificationEl)
  
  setTimeout(() => {
    notificationEl.remove()
  }, 3300)
}


searchBtn.addEventListener('click', (e) => {
  e.preventDefault()
  
  main.innerHTML = ''
  const user = input.value
  
  if(user) {
    getUser(user)

    input.value =''
  }
})

