'use strict'
// randomizer

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  if (callbacks.length < 1) return;

  let secondsElapsed = 0;
  const secondsEnd = 2 * callbacks.length;

  let timer = setInterval(() => {
    secondsElapsed++;
    console.log(secondsElapsed);

    if (secondsElapsed >= secondsEnd) {
      clearInterval(timer);
    }
  }, 1000);

  [...callbacks].forEach(callback => {
    const time = Math.floor(Math.random() * secondsEnd * 1000);
    setTimeout(() => callback(), time);
  })
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6


// reverse engineer
document.querySelector('html').addEventListener('click', (event) => {
  const container = document.querySelector('#container');

  if (event.target !== container) {
   container.style = 'display: none';
  }
});






