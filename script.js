const GameBoard = (() => {
  const gameBoard = [];
  const boardSignature = [];

  const get = () => {
    return gameBoard;
  }

  const getSignature = () => {
    return boardSignature;
  }

  return {get, getSignature};
})();

const DisplayController = (() => {
  const getDisplay = () => {

  };

  const setDisplay = () => {
    
  };
})();

const Player = (name) => {
  const player = {
    name,
    turn: false,
    input: ''
  }

  return {
    player
  };
}


const TicTacToe = (() => {
  const player1 = Player('snowinjelly');
  const player2 = Player('bot');

  //while (GameBoard.get().length < 9) {
    player1.turn = true;
    player1.input = prompt('Player 1: X or O');
    GameBoard.get().push(player1.input);
  return {player1, player2}
})();