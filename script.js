const GameBoard = (() => {
  const board = ['', '', '',
                 '', '', '',
                 '', '', ''];

  const getBoard = () => {
    return board;
  }

  const checkWin = () => {
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') {
      console.log('victory!');
      return true
    }
  }

  const checkTie = () => {

  }

  const length = () => {
    return board.length;
  }

  return {getBoard, checkWin, length, checkTie};
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
    if (player.turn === true) return player.turn = false;
    return player.turn = true;
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

  const start = () => {
    player1.get().turn = true;
  }

  const nextTurn = () => {
    player1.updateTurn();
    player2.updateTurn();
  }

  const whosTurn = () => {
    if (player1.get().turn) return player1.get();
    return player2.get();
  }

  return {getPlayers, start, nextTurn, whosTurn};
})();

const DisplayController = (() => {
  const board = document.querySelector('.board');
  const turnInfo = document.querySelector('.info');

  const updateInfo = () => {
    turnInfo.innerHTML = `
    <h2><span>${TicTacToe.whosTurn().name}</span>'s Turn</h2>
    <h3>Place your (<span>${TicTacToe.whosTurn().input}</span>)</h3>
    `
  }

  const render = () => {
    for (i=0;i<9;i++) {
      const btn = document.createElement('button');
      btn.setAttribute('data-position', i.toString());
      board.appendChild(btn);
    }
    updateInfo();
  }

  board.addEventListener('click', (event) => {
    if (event.target.textContent !== '') {
      return;
    }
    if (GameBoard.checkWin() || GameBoard.checkTie()) {
      return;
    }
    event.target.textContent = TicTacToe.whosTurn().input;
    GameBoard.getBoard()[event.target.getAttribute('data-position')] = TicTacToe.whosTurn().input;
    TicTacToe.nextTurn();
    updateInfo();
  });

  return {render};
})();


TicTacToe.start();
DisplayController.render();