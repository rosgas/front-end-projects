const passwordEl = document.getElementById('password')
const rangeInput = document.getElementById('range-input')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const symbolsEl = document.getElementById('symbols')
const numbersEl = document.getElementById('numbers')
const generateBtn = document.getElementById('generate')
const regenerateBtn = document.getElementById('regenerate')
const copyBtn = document.getElementById('copy')

generateBtn.addEventListener('click', () => {
  const length = +rangeInput.value
  const hasLower = lowercaseEl.checked
  const hasUpper = uppercaseEl.checked
  const hasNumber = numbersEl.checked
  const hasSymbol = symbolsEl.checked

  passwordEl.innerHTML = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length,
  )
})

function generatePassword(lower, upper, number, symbol, length) {
  let generatedpassword = ''
  const typesCount = lower + upper + number + symbol
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0],
  )

  if (typesCount === 0) {
    return ''
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0]

      generatedpassword += randomFunc[funcName]()
    })
  }

  // Sorting the array using the Schwartzian transform

  let unshuffledPassword = Array.from(generatedpassword)

  let shuffledPassword = unshuffledPassword
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  const finalPassword = shuffledPassword.join('').slice(0, length)

  return finalPassword
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  symbol: getRandomSymbol,
  number: getRandomNumber,
}
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
  const symbols = '!"#$%&\'()*+,-./:;<=>?@[]^_{|}~`'
  return symbols[Math.floor(Math.random() * symbols.length)]
}

function copyToClickBoard() {
  const textarea = document.createElement('textarea')
  const password = passwordEl.innerText

  textarea.value = password
  document.body.appendChild(textarea)

  navigator.clipboard
    .writeText(textarea.value)
    .then(() => {
      createErrorNotification('Password copied to clipboard!')
    })
    .catch((err) => {
      console.log('nada')
    })
  textarea.remove()
}

function createErrorNotification(msg) {
  const notification = document.getElementById('notification')
  const notificationEl = document.createElement('div')
  notificationEl.classList.add('notification-box', 'error-box')

  notificationEl.innerHTML = `
  <i class="icon fas fa-check-circle fa-2x"></i>
  <div class="content">
    <h2 class="title error-title">Success!</h2>
    <p class="text">${msg}</p>
  </div>`

  notification.appendChild(notificationEl)

  setTimeout(() => {
    notificationEl.remove()
  }, 3300)
}
