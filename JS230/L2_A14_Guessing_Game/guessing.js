'use strict'

function generateNewNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

addEventListener('DOMContentLoaded', () => {
  let answer = generateNewNumber();
  console.log(answer);
  let guess;
  let count = 0;
  const form = document.querySelector("form");
  const input = form.querySelector("#guess");
  const messageElement = document.querySelector("p");
  const submitButton = document.getElementById('submitButton');
  const newGameElement = document.getElementById('newGame');

  function newGame() {
    answer = generateNewNumber();
    count = 0;
    submitButton.disabled = false;
    messageElement.textContent = 'Guess a number from 1 to 100...'
    console.log(answer)
  }

  form.addEventListener("submit", ev => {
    ev.preventDefault();
    count++;
    guess = parseInt(input.value);
    input.value = '';
    let message;

    if (guess > answer) {
      message = `The answer is lower than ${guess}`;
    } else if (guess < answer) {
      message = `The answer is higher than ${guess}`;
    } else if (guess === answer) {
      message = `${guess} is correct! It took you ${count} guesses.`
      submitButton.disabled = true;
    }

    messageElement.textContent = message;
  })

  newGameElement.addEventListener("click", ev => {
    ev.preventDefault();
    newGame();
  });
});