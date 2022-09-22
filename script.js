const GameBoard = (() => {
  const board = ['', '', '',
                 '', '', '',
                 '', '', ''];

  const getBoard = () => {
    return board;
  }

  const horizontalWinCheck = (startPos) => {
    if (board[startPos] === board[startPos + 1] && board[startPos + 1] === board[startPos + 2] && board[startPos] !== '') {
      return true;
    }
  }

  const checkWin = () => {
    /* horizontal check */
    for (i=0;i<3;i++) {
      let startPos = 0;
      if (i === 1) {
        startPos = 3;
      }
      if (i === 2) {
        startPos = 6;
      }
      if (horizontalWinCheck(startPos)) return true;
    }

    /* ['X', '', '',
        'X', '', '',
        'X', '', ''];
    */
    if (board[0] === board[3] && board[3] === board[6] && board[0] !== '') {
      return true;
    }
    /* ['', 'X', '',
        '', 'X', '',
        '', 'X', ''];
    */
    if (board[1] === board[4] && board[4] === board[7] && board[1] !== '') {
      return true;
    }
    /* ['', '', 'X',
        '', '', 'X',
        '', '', 'X'];
    */
    if (board[2] === board[5] && board[5] === board[8] && board[2] !== '') {
      return true;
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
  let playerClassToggle = true;
  let playerClass = '';

  const updateInfo = () => {
    if (playerClassToggle) {
      playerClass = 'player-1';
    }
    else {
      playerClass = 'player-2';
    }
    turnInfo.innerHTML = `
    <h2><span class="${playerClass}">${TicTacToe.whosTurn().name}</span>'s Turn</h2>
    <h3>Place your (<span class="${playerClass}">${TicTacToe.whosTurn().input}</span>)</h3>
    `
  }

  const winInfo = () => {
    turnInfo.innerHTML = `
    <h2>Game Over!</h2>
    <h3><span class="${playerClass}">${TicTacToe.whosTurn().name}</span> wins! (<span class="${playerClass}">${TicTacToe.whosTurn().input}</span>'s)</h3>
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
    if (playerClassToggle) {
      event.target.setAttribute('class', playerClass);
      playerClassToggle = false;
    }
    else {
      event.target.setAttribute('class', playerClass);
      playerClassToggle = true;
    }
    event.target.textContent = TicTacToe.whosTurn().input;
    GameBoard.getBoard()[event.target.getAttribute('data-position')] = TicTacToe.whosTurn().input;
    if (GameBoard.checkWin()) {
      winInfo();
      return;
    }
    TicTacToe.nextTurn();
    updateInfo();
  });

  return {render};
})();


TicTacToe.start();
DisplayController.render();