const handShakeDiv = document.querySelector('#hand-shake-div')
const inputField = document.querySelector('#input-field')
const shakeHandsButton = document.querySelector('#shake-hands')
const feedback = document.querySelector('#feed-back')

inputField.addEventListener('focus', () => {
  while (feedback.firstChild) feedback.removeChild(feedback.firstChild)
})

const displayMessage = (message, state) => {
  feedback.textContent = message
  if (state === 'fail') {
    feedback.style.color = 'red'
  } else {
    handShakeDiv.classList.add('shake')
    feedback.style.color = 'blue'
  }
  setTimeout(() => {
    handShakeDiv.classList.remove('shake')
  }, 1000)
}

const binaryConverter = (number) => {
  const binaryNumbers = []
  while (number > 0) {
    const remainder = number % 2
    binaryNumbers.push(remainder)
    number = Math.floor(number / 2)
  }
  return Number(binaryNumbers.reverse().join(''))
}

const shakeHands = () => {
  const secretResponseArray = []
  const inputValue = inputField.value.replace(/\s/g, '')

  if (!inputValue || /[^0-9]/g.test(inputValue)) { displayMessage('Please input numbers only', 'fail') } else {
    const number = Number(inputValue)
    let binaryNumber = binaryConverter(number)
    const count = binaryNumber

    while (binaryNumber > 0) {
      if (binaryNumber >= 10000) {
        binaryNumber %= 10000
        continue
      }
      if (binaryNumber >= 1000) {
        secretResponseArray.push('jump')
        binaryNumber -= 1000
      }
      if (binaryNumber >= 100) {
        secretResponseArray.push('close your eyes')
        binaryNumber -= 100
      }
      if (binaryNumber >= 10) {
        secretResponseArray.push('double blink')
        binaryNumber -= 10
      }
      if (binaryNumber >= 1) {
        secretResponseArray.push('wink')
        binaryNumber -= 1
      }
    }
    if (count < 10000) secretResponseArray.reverse()
    displayMessage(secretResponseArray)
  }
}

shakeHandsButton.addEventListener('click', shakeHands)
