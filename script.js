const GameBoard = (() => {
  const board = [];

  const getBoard = () => {
    return board;
  }

  const check = () => {
    if (board[0] === board[1] && board[1] === board[2]) {
      TicTacToe.getPlayers().forEach(player => {
        if (board[0] === player.input) {
          return player.name + ' wins!';
        }
      });
    }
  }

  const length = () => {
    return board.length;
  }

  return {getBoard, getSignature, check, length};
})();

const DisplayController = (() => {
  const getDisplay = () => {

  };

  const setDisplay = () => {
    
  };
})();

const Player = (name, input) => {
    const player = {
      name,
      turn: false,
      input
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
      if (player.turn && GameBoard.length() < 9) {
        GameBoard.getBoard().push(input);
        GameBoard.getSignature().push(player.name);
        TicTacToe.nextTurn();
        if (GameBoard.length() >= 3) {
          GameBoard.check();
        }
      }
    }

  return {get, updateTurn, input};
}


const TicTacToe = (() => {
  const player1 = Player('snow', 'X');
  const player2 = Player('jelly', 'O');

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