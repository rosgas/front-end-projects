const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')
const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')
const toggle = document.querySelector('.toggle')


const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

toggle.addEventListener('click',(e) => {
  const html = document.querySelector('html')
  if(html.classList.contains('dark')){
    html.classList.remove('dark')
    e.target.innerHTML = 'Dark mode'
  } else {
    html.classList.add('dark')
    e.target.innerHTML = 'Light mode'
  }
})

function setTime() {
  const time = new Date()
  const month = time.getMonth()
  const day =  time.getDay()
  const date =  time.getDate()
  const year =  time.getFullYear()
  const hours = time.getHours()
  const hoursForClock = hours == 12 ? '12' : hours % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const ampm = hours >= 12 ? 'PM': 'AM'

  hourEl.style.transform =`rotate(${((minutes/60 + hoursForClock) / 12) * 360}deg)`
  minuteEl.style.transform =`rotate(${((seconds / 60 + minutes) / 60) * 360}deg)`
  secondEl.style.transform =`rotate(${360 * seconds / 60}deg)`

  secondEl.style.transition = `${seconds === 0 ?'none': 'all 0.3s ease'}`
  minuteEl.style.transition = `${seconds === 0 ?'none': 'all 0.3s ease'}`
  hourEl.style.transition = `${seconds === 0 ?'none': 'all 0.3s ease'}`

  timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}`: minutes} ${ampm}`

  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span> ${year}`
}

setTime()

setInterval(setTime, 1000)



