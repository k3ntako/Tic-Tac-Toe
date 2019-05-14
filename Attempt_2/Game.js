const readline = require('readline');
const Board = require('./Board');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//clears terminal
console.reset = function () {
  // return process.stdout.write('\033c');
  return process.stdout.write('\u001B[2J\u001B[0;0f')
}


class Game{
  constructor(props){
    this._currentShape = 'X';
    this._board = null;
    this._winner = null;
  }

  start(size = 3){
    this._board = new Board({ size: size });
    this.print();
    this.makeAMove();
  }

  print(message = ""){
    console.reset();
    console.log("Welcome to K3ntako's Tic-Tac-Toe game!");
    if(!this._winner) console.log(`Tick-tac-toe: ${this._currentShape} is up!`);
    console.log(message);

    //Print column numbers
    let colNums = "   ";
    for( let i = 1; i <= this._board.size; i++){
      colNums += `${i}` + (i !== this._board.size ? ' | ' : '');
    }
    console.log(colNums);

    //Print rows with row numbers
    this._board.board.forEach((row, rowNum) => {
      let boardRow = ` ${rowNum + 1} `;
      row.forEach((cell, idx) => {
        boardRow += (cell || ' ') + (idx !== 2 ? ' | ' : '');
      })
      console.log(boardRow);
    })
  }

  //returns error message; returns empty string if no errors
  checkForErrors(x_coord, y_coord){
    if( isNaN(x_coord) || isNaN(y_coord) ){
      return 'Invalid input, please try again.';
    } else if(x_coord < 0 || y_coord < 0){
      return 'Both X and Y values have to greater than 0.'
    } else if(x_coord > this._board.size || y_coord > this._board.size - 1){
      return `Both X and Y values have to be ${this._board.size} or less.`
    } else if( !this._board.board[x_coord][y_coord] === null ){
      return 'The coordinate selected is already occupied, please try again.'
    }

    return '';
  }

  makeAMove(){
    rl.question('\nPlease enter the coordinates as two numbers as "X,Y" (e.g., 3,2): ', (input) => {
      let coordinates = input.split(',')
      const x_coord = Number(coordinates[1]) - 1; //convert to zero-index
      const y_coord = Number(coordinates[0]) - 1; //convert to zero-index

      const error = this.checkForErrors(x_coord, y_coord);
      if( !error ){
        this._board.board[x_coord][y_coord] = this._currentShape;
        this._currentShape = this._currentShape === 'X' ? 'O' : 'X';
      }

      let winner = this._board.checkWinner();
      if(winner){
        this._winner = winner;
        this.print(`${winner} wins!\n`);
        rl.close();
      }else{
        this.print(error);
        this.makeAMove();
      }
    });
  }
}

module.exports = Game;
