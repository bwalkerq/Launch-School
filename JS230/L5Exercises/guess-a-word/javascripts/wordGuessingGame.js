let randomWord = function() {
  let words = [
    'pear',
    'kumquat',
    'indigo',
    'frenchie',
    'fandango',
    'iriquois',
  ]

  return function() {
    let randomIndex = Math.floor(Math.random() * words.length)
    if (words.length === 0) return undefined;
    return words.splice(randomIndex, 1)
  }
}();

class Game {
  constructor() {
    this.word = randomWord();

  }

}