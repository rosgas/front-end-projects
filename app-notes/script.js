// Storage controller

const StorageCtrl = (function () {
  return {
    storeCard: function (card) {
      let cards

      if (localStorage.getItem('cards') === null) {
        cards = []
        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards))
      } else {
        cards = JSON.parse(localStorage.getItem('cards'))
        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards))
      }
    },

    getCardsFromStorage: function () {
      let cards

      if (localStorage.getItem('cards') === null) {
        cards = []
      } else {
        cards = JSON.parse(localStorage.getItem('cards'))
      }

      return cards
    },

    deleteCardFromStorage: function (id) {
      let cards = JSON.parse(localStorage.getItem('cards'))

      cards.forEach(function (card, index) {
        if (id === JSON.stringify(card.id)) {
          cards.splice(index, 1)
        }
      })

      localStorage.setItem('cards', JSON.stringify(cards))
    },

    updateCard: function (updatedCard) {
      let cards = JSON.parse(localStorage.getItem('cards'))

      cards.forEach(function (card, index) {
        if (updatedCard.id === card.id) {
          cards.splice(index, 1, updatedCard)
        }
      })

      localStorage.setItem('cards', JSON.stringify(cards))
    },

    assignCardId: function () {
      if (localStorage.getItem('cards') === null) {
        id = 0
        localStorage.setItem('id', JSON.stringify(id))
      } else {
        idValue = JSON.parse(localStorage.getItem('id'))
        idValue++
        id = idValue
        localStorage.setItem('id', JSON.stringify(id))
      }

      return id
    },
  }
})()

// Item controller

const CardCtrl = (function () {
  // Card constructor
  const Card = function (id, note, date, color) {
    this.id = id
    this.note = note
    this.date = date
    this.color = color
  }

  const data = {
    cards: StorageCtrl.getCardsFromStorage(),
    currentCard: null,
  }

  return {
    addCard: function (date, color) {
      let id = StorageCtrl.assignCardId()
      let note = ''

      newCard = new Card(id, note, date, color)

      data.cards.push(newCard)

      return newCard
    },

    deleteCard: function (id) {
      data.cards.forEach(function (card, index) {
        if (id === JSON.stringify(card.id)) {
          data.cards.splice(index, 1)
        }
      })
    },

    getCurrentCard: function () {
      return data.currentCard
    },

    updateCurrentCard: function (id, cardNote) {
      let found

      data.cards.forEach(function (card) {
        if (id === JSON.stringify(card.id)) {
          card.note = cardNote
          data.currentCard = card
          found = card
        }
      })

      return found
    },

    resetCurrentCard: function () {
      data.currentCard = null
    },

    logData: function () {
      return data
    },
  }
})()

// UI controller

const UICtrl = (function () {
  const UISelectors = {
    message: document.querySelector('.intro-message'),
    cardsContainer: document.querySelector('.note-cards'),
    btnsContainer: document.querySelector('.buttons'),
    addBtn: document.querySelector('.add-btn'),
    colorBtns: document.querySelectorAll('.color-btn'),
  }

  const hideIntroMessage = function () {
    UISelectors.message.style.opacity = '0'

    setTimeout(function () {
      UISelectors.message.style.display = 'none'
    }, 100)
  }

  const showIntroMessage = function () {
    UISelectors.message.style.display = 'flex'
    setTimeout(function () {
      UISelectors.message.style.opacity = '1'
    }, 100)
  }

  const getDate = function () {
    const date = new Date()
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    const currentDate = `${month} ${day}, ${year}`

    return currentDate
  }

  const hideColors = function () {
    UISelectors.addBtn.classList.remove('active')

    UISelectors.colorBtns.forEach((btn) => {
      btn.classList.remove('fadein')
      btn.classList.add('fadeout')
    })
  }

  return {
    showColors: function () {
      UISelectors.addBtn.classList.add('active')

      UISelectors.colorBtns.forEach((btn) => {
        btn.classList.remove('fadeout')
        btn.classList.add('fadein')
      })
    },

    getCardVaues: function (e) {
      return {
        date: getDate(),
        color: e.target.classList[1],
      }
    },

    createCard: function (card) {
      hideIntroMessage()
      const cardEl = document.createElement('div')

      cardEl.classList.add('card', `${card.color}`)
      cardEl.setAttribute('id', `card-${card.id}`)

      cardEl.innerHTML = `
        <textarea
          class = "note"
          cols="30"
          rows="6"
          placeholder="Add note..."
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
        >${card.note}</textarea>
        <div class="card-footer">
          <div class="date">${card.date}</div>
          <div class="tools">
            <button class="card-btn delete">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      `
      UISelectors.cardsContainer.appendChild(cardEl)

      setTimeout(function () {
        cardEl.classList.add('show')
      }, 0)

      hideColors()
    },

    populateCardsContainer: function () {
      const cards = StorageCtrl.getCardsFromStorage()

      cards.forEach((card) => {
        UICtrl.createCard(card)
      })
    },

    deleteCard: function (e) {
      e.target.closest('.card').remove()

      if (UISelectors.cardsContainer.innerHTML === '') {
        showIntroMessage()
      }
    },

    blurTextarea: function (textarea) {
      textarea.blur()
    },

    focusCurrentCard: function (e) {
      if (e.target.classList.contains('note')) {
        const cards = UISelectors.cardsContainer.querySelectorAll('.card')
        const currentCard = e.target.closest('.card')
        const cCTextarea = currentCard.querySelector('.note')
        const cCDeleteBtn = currentCard.querySelector('.card-btn')

        cards.forEach((card) => {
          const textarea = card.querySelector('.note')
          const deleteBtn = card.querySelector('.card-btn')

          card.style.opacity = '0.4'

          textarea.style.cursor = 'default'

          deleteBtn.style.cursor = 'default'

          deleteBtn.classList.remove('delete')
        })

        currentCard.style.opacity = '1'
        currentCard.style.transform = 'scale(1.05)'

        cCTextarea.style.cursor = 'auto'

        cCDeleteBtn.style.cursor = 'pointer'
        cCDeleteBtn.classList.add('delete')
      }
    },

    blurCurrentCard: function (e) {
      if (!e.target.classList.contains('note')) {
        const cards = UISelectors.cardsContainer.querySelectorAll('.card')

        cards.forEach((card) => {
          const textarea = card.querySelector('.note')
          const deleteBtn = card.querySelector('.card-btn')

          card.style.opacity = '1'
          card.style.transform = 'scale(1)'

          textarea.style.cursor = 'auto'

          deleteBtn.style.cursor = 'pointer'
          deleteBtn.classList.add('delete')
        })
      }
    },

    getUISelectors: function () {
      return UISelectors
    },
  }
})()

// App controller

const AppCtrl = (function (UICtrl) {
  const UISelectors = UICtrl.getUISelectors()

  const loadEventListener = function () {
    UISelectors.addBtn.addEventListener('click', UICtrl.showColors)

    UISelectors.btnsContainer.addEventListener('click', createCard)

    UISelectors.cardsContainer.addEventListener('click', deleteCard)

    UISelectors.cardsContainer.addEventListener(
      'click',
      UICtrl.focusCurrentCard,
    )

    UISelectors.cardsContainer.addEventListener('keyup', setCard)

    document.addEventListener('click', saveEditedCard)
  }

  const createCard = function (e) {
    if (e.target.classList.contains('color-btn')) {
      const card = UICtrl.getCardVaues(e)

      const newCard = CardCtrl.addCard(card.date, card.color)

      StorageCtrl.storeCard(newCard)

      UICtrl.createCard(newCard)
    }
  }

  const getCardId = function (card) {
    currentCardId = card.id
    id = currentCardId.split('-')[1]

    return id
  }

  const deleteCard = function (e) {
    if (
      e.target.classList.contains('delete') ||
      e.target.parentElement.classList.contains('delete')
    ) {
      const card = e.target.closest('.card')
      getCardId(card)

      CardCtrl.deleteCard(id)

      StorageCtrl.deleteCardFromStorage(id)
      UICtrl.deleteCard(e)
    }
  }

  const setCard = function (e) {
    if (e.target.classList.contains('note')) {
      const card = e.target.closest('.card')
      getCardId(card)

      const cardNote = e.target.value

      CardCtrl.updateCurrentCard(id, cardNote)
    }
  }

  const saveEditedCard = function (e) {
    UICtrl.blurCurrentCard(e)
    const currentCard = CardCtrl.getCurrentCard()

    if (currentCard !== null) {
      StorageCtrl.updateCard(currentCard)

      CardCtrl.resetCurrentCard()
    }
  }

  return {
    init: function () {
      const storedCards = StorageCtrl.getCardsFromStorage()

      if (storedCards.length !== 0) {
        UICtrl.populateCardsContainer()
      }

      loadEventListener()
    },
  }
})(UICtrl)

// Initialize app

AppCtrl.init()
