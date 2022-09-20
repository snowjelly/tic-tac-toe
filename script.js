const GameBoard = (() => {
  const board = [];
  const signature = [];

  const get = () => {
    return {board, signature};
  }

  return {get};
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

    const input = (input) => {
      if (player.turn) {
        GameBoard.get().board.push(input);
        GameBoard.get().signature.push(player.name);
        TicTacToe.nextTurn();
      }
    }

  return {get, updateTurn, input};
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
    player1.input(prompt('It is now ' + player1.get().name + "'s turn. Enter an X or an O"));
  }
  return {getPlayers, start, nextTurn};
})();