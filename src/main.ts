import './style.css'

// The essence of Hangman AKA "Guess the word":
// Enter characters
// See which characters they guessed
// See which characters they got wrong
// Be told when they guessed the word
// Be told when they lose the game

// ???: How do we get a random


let words = [
  'prishtina',
  'tirana',
  'london',
  'berlin',
  'washington',
  'mitrovica',
  'gjakova',
  'shkoder',
  'obiliq',
]




let state = {
  word: getRandomWord(),
  characters: [],
  maxMistakes: 7
}

function getRightGuesses() {
  return state.characters.filter(function (letter) {
    return state.word.toLowerCase().includes(letter.toLowerCase())
  })
}

function getWrongGuesses() {
  return state.characters.filter(function (letter) {
    return !state.word.toLowerCase().includes(letter.toLowerCase())
  })
}

function checkIfLost() {
  const numberOfWrongGuesses = getWrongGuesses().length
  return numberOfWrongGuesses >= state.maxMistakes
}

function checkIfWon() {
  return state.word.split('').every(function (letter) {
    return state.characters.includes(letter)
  })
}


function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}


function renderWord() {

  const wordEl = document.createElement('div')
  wordEl.className = "word"

  

  const rightGuesses = getRightGuesses()

  for (const letter of state.word) {
    const letterEl = document.createElement('span')

    if (rightGuesses.includes(letter)) {
      letterEl.textContent = letter
    } else {
      letterEl.textContent = '_'
    }

    wordEl.append(letterEl)
  }
  document.body.append(wordEl)
}

function renderWrongGuesses() {
  const spanEl = document.createElement('span')
  spanEl.setAttribute('class', 'wrong-guesses')

  const wrongGuesses = getWrongGuesses()
  spanEl.textContent = `Wrong guesses: ${wrongGuesses.join(',')} (${
    wrongGuesses.length
  })`

  document.body.append(spanEl)
}

function renderWinOrLostMessage() {
  const lost = checkIfLost()
  const won = checkIfWon()

  if (!lost && !won) return

  if (lost) {
    const lostSection = document.createElement('div')

    const messageEl = document.createElement('span')
    messageEl.textContent = 'Sorry, you lost🤕'

    const restartButton = document.createElement('button')
    restartButton.textContent = 'RESTART'
    restartButton.addEventListener('click', function () {
      state.word = getRandomWord()
      state.characters = []
      render()
    })

    lostSection.append(messageEl, restartButton)
    document.body.append(lostSection)
  }

  if (won) {
    const winSection = document.createElement('div')

    const messageEl = document.createElement('span')
    messageEl.textContent = 'Yes you win 🎉'

    const restartButton = document.createElement('button')
    restartButton.textContent = 'RESTART'
    restartButton.addEventListener('click', function () {
      state.word = getRandomWord()
      state.characters = []
      render()
    })

    winSection.append(messageEl, restartButton)
    document.body.append(winSection)
  }
}

function renderTheText(){
  document.body.innerHTML = ''
  createSomeUsefulText()
}


function render() {
  document.body.innerHTML = ''

  
  
  renderWord()
  renderWrongGuesses()
  renderWinOrLostMessage()
}

function createSomeUsefulText(){
  let projectName = document.createElement('h1')
  projectName.textContent = 'Project name: Hangman'

  let projectDescription = document.createElement('h2')
  projectDescription.textContent = `Project description:`

  let projectDescriptionText = document.createElement('h3')
  projectDescriptionText.textContent = `A game where you try to guess the word before you run out of guesses.`

  let projectDescriptionText2 = document.createElement('h2')
  projectDescriptionText2.textContent = `Click down below to get started!`

  let projectButton = document.createElement('button')
  projectButton.className = 'project-button'
  projectButton.textContent = 'Play'
  projectButton.addEventListener('click', function () {
    render()
  }, {once: true})

  
  document.body.append(projectName, projectDescription, projectDescriptionText, projectDescriptionText2, projectButton)

}


function listenForKeypresses() {
  // Every time a letter is pressed, do something
  document.addEventListener('keypress', function (event) {
    // if the key pressed is not already guessed
    const haventLost = !checkIfLost()
    const haventWon = !checkIfWon()
    const keyIsNotAlreadyGuessed = !state.characters.includes(event.key)

    if (keyIsNotAlreadyGuessed && haventLost && haventWon) {
      // add it to the guesses
      state.characters.push(event.key)
      render()
    }
  })
}

  renderTheText()
  listenForKeypresses()