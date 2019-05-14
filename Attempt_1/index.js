const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let winX = "";
let winO = "";

console.reset = function () {
  return process.stdout.write('\033c');
}

function createBoard(size = 3){
  board = []
  for(let i = 0; i < size; i++){
    let row = []
    for(let i = 0; i < size; i++){
      row.push(null)
    }
    board.push(row);
    winX += "X";
    winO += "O";
  }
  return board;
}

//state
let currentBoard = createBoard();
let currentShape = 'X';

function print(board, message = ""){
  console.reset();
  console.log(`Tick-tac-toe: ${currentShape} is up!`);
  console.log(message);

  //Print column numbers
  let printColNums = "   ";
  for( let i = 1; i <= board[0].length; i++){
    printColNums += `${i}` + (i !== board[0].length ? ' | ' : '');
  }
  console.log(printColNums);

  //Print board
  board.forEach((row, rowNum) => {
    let printRow = ` ${rowNum + 1} `;
    row.forEach((cell, idx) => {
      printRow += (cell || ' ') + (idx !== 2 ? ' | ' : '');
    })
    console.log(printRow);
  })
}

function makeAMove(){

  let error = "";
  rl.question('\nPlease enter the coordinates as two numbers as "X,Y" (e.g., 3,2): ', (input) => {
    let coordinates = input.split(',')
    const x_coord = Number(coordinates[1] - 1);
    const y_coord = Number(coordinates[0] - 1);

    if(isNaN(x_coord) || isNaN(y_coord)){
      error = 'Invalid input, please try again.'
    }else if(currentBoard[x_coord][y_coord] === null){
      currentBoard[x_coord][y_coord] = currentShape;
      currentShape = currentShape === 'X' ? 'O' : 'X';
    }else{
      error = 'The coordinate selected is already occupied, please try again.'
    }

    let winner = checkWinner(currentBoard);

    if(winner){
      print(currentBoard, `${winner} wins!`);
      rl.close();
    }else{
      print(currentBoard, error);
      makeAMove();
    }
  });
}

function checkWinner(board){
  let columns = [];
  let diagonals = ['', ''];
  for(let rowNum = 0; rowNum < board.length; rowNum++){
    //check row
    let row = board[rowNum].join("");
    if(row === winX) return 'X';
    if(row === winO) return 'O';

    diagonals[0] += board[rowNum][rowNum];
    diagonals[1] += board[rowNum][board.length - 1 - rowNum];

    for(let colNum = 0; colNum < board[0].length; colNum++){
      columns[colNum] = (columns[colNum] || "") + board[rowNum][colNum];
    }
  }

  if(diagonals.includes(winX)) return 'X';
  if(diagonals.includes(winO)) return 'O';
  if(columns.includes(winX)) return 'X';
  if(columns.includes(winO)) return 'O';

  return false
}

print(currentBoard);
makeAMove();
