const infoBtn = document.querySelector('.info-btn')
const successBtn = document.querySelector('.success-btn')
const warningBtn = document.querySelector('.warning-btn')
const errorBtn = document.querySelector('.error-btn')

const toastContainer = document.getElementById('toast-container')

infoBtn.addEventListener('click', () => createInfoNotification())

function createInfoNotification() {
  const notificationEl = document.createElement('div')
  notificationEl.classList.add('notification-box', 'info-box', 'show')

  notificationEl.innerHTML = `
  <i class="icon info-icon fas fa-comment fa-2x"></i>
  <div class="content">
    <h2 class="title info-title">Info notification</h2>
    <p class="text">This is an info notification</p>
  </div>`
  
  toastContainer.appendChild(notificationEl)

  setTimeout(() => {
    notificationEl.remove()
  }, 3000)
}

successBtn.addEventListener('click', () => createSuccessNotification())

function createSuccessNotification() {
  const notificationEl = document.createElement('div')
  notificationEl.classList.add('notification-box', 'success-box', 'show')

  notificationEl.innerHTML = `
  <i class="icon success-icon fas fa-check-circle fa-2x"></i>
  <div class="content">
    <h2 class="title success-title">Success notification</h2>
    <p class="text">This is a success notification</p>
  </div>`
  
  toastContainer.appendChild(notificationEl)

  setTimeout(() => {
    notificationEl.remove()
  }, 3000)
}

warningBtn.addEventListener('click', () => createWarningNotification())

function createWarningNotification() {
  const notificationEl = document.createElement('div')
  notificationEl.classList.add('notification-box', 'warning-box', 'show')

  notificationEl.innerHTML = `
  <i class="icon warning-icon fas fa-exclamation-triangle fa-2x"></i>
  <div class="content">
    <h2 class="title warning-title">Warning notification</h2>
    <p class="text">This is a warning notification</p>
  </div>`
  
  toastContainer.appendChild(notificationEl)

  setTimeout(() => {
    notificationEl.remove()
  }, 3000)
}

errorBtn.addEventListener('click', () => createErrorNotification())

function createErrorNotification() {
  const notificationEl = document.createElement('div')
  notificationEl.classList.add('notification-box', 'error-box')

  notificationEl.innerHTML = `
  <i class="icon error-icon fas fa-times-circle fa-2x"></i>
  <div class="content">
    <h2 class="title error-title">Error notification</h2>
    <p class="text">This is an error notification</p>
  </div>`
  
  toastContainer.appendChild(notificationEl)
  
  setTimeout(() => {
    notificationEl.remove()
  }, 3000)
}
