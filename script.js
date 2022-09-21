const GameBoard = (() => {
  const board = ['X', 'O', 'X',
                 'X', 'O', 'X',
                 'X', 'O', 'X'];

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

  return {getBoard, check, length};
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

  const play = () => {
    if (player.turn && GameBoard.length() < 9) {
      GameBoard.getBoard().push(player.input);
      GameBoard.getSignature().push(player.name);
      TicTacToe.nextTurn();
      if (GameBoard.length() >= 3) {
        GameBoard.check();
      }
    }
  }

return {get, updateTurn, play};
}

const TicTacToe = (() => {
  const player1 = Player('snow', 'X');
  const player2 = Player('jelly', 'O');

  const getPlayers = () => {
    return [player1.get(), player2.get()];
  }

  const whosTurn = () => {
    for (i=0;i<getPlayers().length;i++) {
      if (getPlayers()[i].turn = true) {
        return getPlayers()[i].name;
      }
    }
  }
  
  const nextTurn = () => {
    player1.updateTurn();
    player2.updateTurn();
  }


  const start = () => {
    //while (GameBoard.get().length < 9) {
    player1.get().turn = true;
  }
  return {getPlayers, start, nextTurn, whosTurn};
})();

const DisplayController = (() => {
  const board = document.querySelector('.board');
  const turnInfo = document.querySelector('.info h2');
  board.addEventListener('click', (event) => {
    console.log(event.target);
    turnInfo.textContent = TicTacToe.whosTurn();
  });
  const render = () => {
    for (i=0;i<9;i++) {
      const btn = document.createElement('button');
      btn.setAttribute('data-position', i.toString());
      board.appendChild(btn);
    }
    turnInfo.textContent = TicTacToe.whosTurn();
  }

  return {render};
})();



DisplayController.render();