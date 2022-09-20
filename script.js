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

    const get = () => {
      return player;
    }

    const updateTurn = () => {
      if (player.turn === true) {
        player.turn = false;
      }
      else if (player.turn === false){
        player.turn = true;
      }
    }
  return {get, updateTurn};
}


const TicTacToe = (() => {
  const player1 = Player('snow');
  const player2 = Player('jelly');

  const getPlayers = () => {
    return [player1.get(), player2.get()];
  }
  
  const nextTurn = () => {
    player1.updateTurn();
    player2.updateTurn();
  }


  const start = () => {
    //while (GameBoard.get().length < 9) {
    player1.get().turn = true;
  }
  return {getPlayers, start, nextTurn};
})();