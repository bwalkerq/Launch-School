/*
description:
Tic Tac Toe is a 2-player board game played on a 3x3 grid. Players take turns
marking a square. The first player to mark 3 squares in a row wins.

nouns and verbs
player 1
computer
board

take a turn, mark a square
win (3  squares)

 */

const rlSync = require('readline-sync');

class TTTGame {
  constructor() {}

  play() {
    displayWelcome()
    while (!someoneWon()) {

    }
  }
}

class Human {
  constructor() {
    this.name = this.getName();
  }

  getName() {
    return rlSync.question('Please enter your name:')
  }
}

class Computer {

}

class Board {
  displayBoard() {}

}

let game = new TTTGame;
game.play();