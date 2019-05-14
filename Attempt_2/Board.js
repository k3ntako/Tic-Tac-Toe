class Board{
  constructor(props){
    this._size = props.size || 3;

    const setUp = this.setUp(props.size);
    this._board = setUp.board;
    this._winX = setUp.winX; //win condition for X
    this._winO = setUp.winO; //win condition for O
  }

  get board(){
    return this._board;
  }

  get size(){
    return this._size;
  }

  setUp(size = 3){
    let winX = "", winO = "", board = [];
    for(let i = 0; i < size; i++){
      let row = []
      for(let i = 0; i < size; i++){
        row.push(null)
      }
      board.push(row);
      winX += "X";
      winO += "O";
    }

    return { board, winX, winO };
  }

  checkWinner(){
    let columns = [];
    let diagonals = ['', ''];

    //check row and prepare columns and diagnoals
    for(let rowNum = 0; rowNum < this._size; rowNum++){
      let row = this._board[rowNum].join("");
      if(row === this._winX) return 'X';
      if(row === this._winO) return 'O';

      diagonals[0] += this._board[rowNum][rowNum];
      diagonals[1] += this._board[rowNum][this._size - 1 - rowNum];

      for(let colNum = 0; colNum < this._size; colNum++){
        columns[colNum] = (columns[colNum] || "") + this._board[rowNum][colNum];
      }
    }

    //check columns and diagonals
    if(diagonals.includes(this._winX)) return 'X';
    if(diagonals.includes(this._winO)) return 'O';
    if(columns.includes(this._winX)) return 'X';
    if(columns.includes(this._winO)) return 'O';

    return null;
  }
}

module.exports = Board;
