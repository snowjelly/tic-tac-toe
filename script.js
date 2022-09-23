const GameBoard = (() => {
  const board = ['', '', '',
                 '', '', '',
                 '', '', ''];

  const getBoard = () => {
    return board;
  }

  const horizontalWin = (startPos) => {
    if (board[startPos] === board[startPos + 1] && board[startPos + 1] === board[startPos + 2] && board[startPos] !== '') {
      return true;
    }
  }

  const verticalWin = (startPos) => {
    if (board[startPos] === board[startPos + 3] && board[startPos + 3] === board[startPos + 6] && board[startPos] !== '') {
      return true;
    }
  }

  const diagonalWin = (startPos) => {
    if (startPos === 2) {
      if (board[startPos] === board[startPos * 2] && board[startPos * 2] === board[startPos * 3] && board[startPos] !== '') {
        return true;
      }
    }
    if (startPos === 0) {
      if (board[startPos] === board[startPos + 4] && board[startPos + 4] === board[startPos + 8] && board[startPos] !== '') {
        return true;
      }
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
      if (horizontalWin(startPos)) return true;
    }

    /* vertical check */
    for (i=0;i<3;i++) {
      let startPos = 0;
      if (i === 1) {
        startPos = 1;
      }
      if (i === 2) {
        startPos = 2;
      }
      if (verticalWin(startPos)) return true;
    }

    /* diagonal check */
    for (i=0;i<2;i++) {
      let startPos = 0;
      if (i === 1) {
        startPos = 2;
      }
      if (diagonalWin(startPos)) return true;
    }
  }

  const checkTie = () => {
    if (board.includes('') === false) {
      return true;
    }
  }

  const length = () => {
    return board.length;
  }

  return {getBoard, checkWin, length, checkTie};
})();

const Player = (name, input, color) => {
  const player = {
    name,
    turn: false,
    input,
    color
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
  const form = document.querySelector('#form');
  let player1;
  let player2;
  let playerName;
  let playerInput;
  let playerColor;
  let playerCount = 0;
  const playerCreation = (event) => {
    if (playerCount < 2) {
      for (i=0;i<event.target.children.length;i++) {
        if (event.target.children[i].id === 'p1-name') {
          playerName = event.target.children[i].value;
        }
        if (event.target.children[i].id === 'p1-input') {
          playerInput = event.target.children[i].value;
        }
        if (event.target.children[i].className === 'color-picker') {
          if (event.target.children[i].getAttribute('style') !== null) {
            const colorPickerStyle = event.target.children[i].getAttribute('style');
            const colorIndex = event.target.children[i].getAttribute('style').indexOf('rgb');
            playerColor = colorPickerStyle.slice(colorIndex);
          }
          else if (event.target.children[i].getAttribute('style') === null) {
            playerColor = 'var(--violet-500);';
          }
        }
      }
      if (playerCount === 0) {
        player1 = Player(playerName, playerInput, playerColor);
      }
      if (playerCount === 1) {
        player2 = Player(playerName, playerInput, playerColor);
      }
      playerCount++;
    }
  }

  const formSubmission = (event) => {
    event.preventDefault();
    playerCreation(event);
    if (playerCount === 2) {
      console.log(getPlayers());
    }
  }


  form.addEventListener('submit', formSubmission);

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

  return {getPlayers, start, nextTurn, whosTurn, player1};
})();

const DisplayController = (() => {



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

  const tieInfo = () => {
    turnInfo.innerHTML = `
    <h2>Game Over!</h2>
    <h3>You tied!</h3>
    `
  }

  const renderBoard = () => {
    const body = document.querySelector('body');
    const board = document.createElement('div');
    const turnInfo = document.createElement('div');
  
    board.setAttribute('class', 'board');
    turnInfo.setAttribute('class', 'info');
    body.appendChild(turnInfo);
    body.appendChild(board);

    for (i=0;i<9;i++) {
      const btn = document.createElement('button');
      btn.setAttribute('data-position', i.toString());
      board.appendChild(btn);
    }
    updateInfo();
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
      if (GameBoard.checkTie()) {
        tieInfo();
        return;
      }
      TicTacToe.nextTurn();
      updateInfo();
    });
  }

  const renderColorPicker = () => {
    const colorPicker = document.querySelector('.color-picker');
    const picker = new Picker(colorPicker);
    picker.onChange = function(color) {
      colorPicker.style.backgroundColor = color.rgbaString;
    }
  }
// <div class="board collapse"></div>
  

  return {renderBoard, renderColorPicker};
})();



DisplayController.renderColorPicker();
