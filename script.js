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

return {get, updateTurn};
}

const DisplayController = (() => {
  let playerClassToggle = true;
  let playerClass = '';
  const turnInfo = document.createElement('div');
  const formContainer = document.createElement('div');
  const formHeader = document.createElement('h1');
  const form = document.createElement('form');

  const intro = document.querySelector('.intro');
  const body = document.querySelector('body');

  const renderFormHeader = () => {
    formHeader.textContent = 'Player 2';
    formHeader.style.color = '';
  }

  const renderForm = () => {
    formContainer.setAttribute('class', 'form-container');
    formHeader.textContent = 'Player 1';
    form.setAttribute('id', 'form');

    intro.appendChild(formContainer);
    formContainer.appendChild(formHeader);
    formContainer.appendChild(form);
    form.innerHTML = `
    <label for="name">Name</label>
    <input name="name" id="name" type="text" required>
    <label for="input">Input</label>
    <select name="input" id="input">
      <option value="X">X</option>
      <option value="O">O</option>
    </select>
    <p>Color</p>
    <div class="color-picker"></div>
    <button>Join game</button>
    `
  }

  const getForm = () => {
    return form;
  }

  const removeIntro = () => {
    intro.remove();
  }

  const removeP2InputChoice = ([player1Input]) => {
    const formInput = document.querySelector('#input');
    for (i=0;i<formInput.children.length;i++) {
      if (formInput.children[i].value === player1Input) {
        formInput.children[i].remove();
      }
    }
  }

  const renderBoard = () => {
    const boardContainer = document.createElement('div');
    const board = document.createElement('div');

    boardContainer.setAttribute('class', 'board-container');
    board.setAttribute('class', 'board');
    turnInfo.setAttribute('class', 'info');
    body.appendChild(turnInfo);
    body.appendChild(boardContainer);
    boardContainer.appendChild(board);

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
        event.target.setAttribute('style', 'color: ' + TicTacToe.whosTurn().color);
        playerClassToggle = false;
      }
      else {
        event.target.setAttribute('style', 'color: ' + TicTacToe.whosTurn().color);
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

  const updateInfo = () => {
    if (playerClassToggle) {
      playerClass = 'player-1';
    }
    else {
      playerClass = 'player-2';
    }
    turnInfo.innerHTML = `
    <h2><span style="color: ${TicTacToe.whosTurn().color}">${TicTacToe.whosTurn().name}</span>'s Turn</h2>
    <h3>Place your (<span style="color: ${TicTacToe.whosTurn().color}">${TicTacToe.whosTurn().input}</span>)</h3>
    `
  }

  const winInfo = () => {
    turnInfo.innerHTML = `
    <h2>Game Over!</h2>
    <h3><span style="color: ${TicTacToe.whosTurn().color}">${TicTacToe.whosTurn().name}</span> wins! (<span style="color: ${TicTacToe.whosTurn().color}">${TicTacToe.whosTurn().input}</span>'s)</h3>
    `
  }

  const tieInfo = () => {
    turnInfo.innerHTML = `
    <h2>Game Over!</h2>
    <h3>You tied!</h3>
    `
  }

  const renderColorPicker = () => {
    const colorPicker = getColorPicker();
    const picker = new Picker(colorPicker);
    picker.onChange = function(color) {
      colorPicker.style.backgroundColor = color.rgbaString;
      formHeader.style.color = color.rgbaString;
    }
  }

  const getColorPicker = () => {
    const colorPicker = document.querySelector('.color-picker');
    return colorPicker;
  }
  
  const resetColorPicker = () => {
    const colorPicker = getColorPicker();
    colorPicker.style.backgroundColor = '';
  }

  const resetForm = () => {
    const formName = document.querySelector('#name');
    formName.value = '';
  }
  return {renderBoard, renderColorPicker, renderForm, resetForm, renderFormHeader, removeIntro, removeP2InputChoice, resetColorPicker, getForm};
})();

const TicTacToe = (() => {
  let player1;
  let player2;
  let playerName;
  let playerInput;
  let playerColor;
  let playerCount = 0;
  let player1Input;

  const form = DisplayController.getForm();

  const playerCreation = (event) => {
    if (playerCount < 2) {
      for (i=0;i<event.target.children.length;i++) {
        if (event.target.children[i].id === 'name') {
          playerName = event.target.children[i].value;
        }
        if (event.target.children[i].id === 'input') {
          if (playerCount === 0) {
            playerInput = event.target.children[i].value;
            player1Input = playerInput;
          }
          if (playerCount === 1) {
            playerInput = event.target.children[i].value;
            player2Input = playerInput;
          }
        }
        if (event.target.children[i].className === 'color-picker') {
          if (event.target.children[i].getAttribute('style') !== null) {
            const colorPickerStyle = event.target.children[i].getAttribute('style');
            const colorIndex = event.target.children[i].getAttribute('style').indexOf('rgb');
            playerColor = colorPickerStyle.slice(colorIndex);
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
    if (playerCount === 1) {
      TicTacToe.start();
      DisplayController.renderFormHeader();
      DisplayController.removeP2InputChoice(player1Input);
      DisplayController.resetForm();
      DisplayController.resetColorPicker();
    }
    if (playerCount === 2) {
      DisplayController.removeIntro();
      DisplayController.renderBoard();
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

  return {getPlayers, start, nextTurn, whosTurn};
})();



DisplayController.renderForm();
DisplayController.renderColorPicker();

