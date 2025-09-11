// main.js
document.addEventListener('DOMContentLoaded', init);

function init() {
  // --- referencias al DOM ---
  let tablero = document.getElementById('tablero');
  let celdas = tablero.querySelectorAll('.celda');
  let overlay = document.getElementById('overlay');
  let winnerText = document.getElementById('winnerText');
  let nextBtn = document.getElementById('next');    // botón NEXT ROUND del modal
  let quitBtn = document.getElementById('quit');    // botón QUIT del modal
  let reinicioBtn = document.getElementById('reinicio'); // TU botón "reinicio"
  let turnX = document.getElementById('turnX');
  let turnO = document.getElementById('turnO');
  let winXImg = document.getElementById('winX');
  let winOImg = document.getElementById('winO');

  // --- estado del juego ---
  let board = ['', '', '', '', '', '', '', '', '']; // modelo lógico
  let turno = 'X';
  let gameOver = false;

  let combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  // asignar data-index a cada celda (map DOM <-> board)
  for (let i = 0; i < celdas.length; i++) {
    celdas[i].setAttribute('data-index', i);
  }

  // mostrar turno inicial en UI
  updateTurnUI();

  // Delegación: un listener en el contenedor
  tablero.addEventListener('click', handleClick);

  // --------------------
  // boton REINICIO
  // --------------------
  if (reinicioBtn) {
    reinicioBtn.addEventListener('click', function () {
      reinicioBtn.classList.add('scale-95');
      setTimeout(() => reinicioBtn.classList.remove('scale-95'), 120);

      resetBoard();
      if (overlay) overlay.classList.add('hidden');
    });
  }

  // botones del modal
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      resetBoard();
      if (overlay) overlay.classList.add('hidden');
    });
  }
  if (quitBtn) {
    quitBtn.addEventListener('click', function () {
      resetBoard();
      if (overlay) overlay.classList.add('hidden');
    });
  }

  // --------------------
  // funciones principales del juego
  // --------------------
  function handleClick(e) {
    if (gameOver) return;

    let target = e.target;
    let cell = target.closest('.celda');
    if (!cell) return;

    let index = parseInt(cell.getAttribute('data-index'), 10);
    if (isNaN(index)) return;

    if (board[index] !== '') return;

    makeMove(index, cell);
  }

  function makeMove(index, cell) {
    board[index] = turno;
    renderCell(cell, turno);

    if (checkWinner(turno)) {
      gameOver = true;
      showWin(turno);
      return;
    }

    if (board.indexOf('') === -1) {
      gameOver = true;
      showTie();
      return;
    }

    turno = (turno === 'X') ? 'O' : 'X';
    updateTurnUI();
  }

  function renderCell(cell, player) {
    let imgX = cell.querySelector('.uno');
    let imgO = cell.querySelector('.dos');

    if (player === 'X' && imgX) imgX.classList.remove('hidden');
    if (player === 'O' && imgO) imgO.classList.remove('hidden');

    cell.style.pointerEvents = 'none';
  }

  function checkWinner(player) {
    return combos.some(([a, b, c]) =>
      board[a] === player && board[b] === player && board[c] === player
    );
  }

  function showWin(player) {
    if (winnerText) {
      winnerText.textContent = 'TAKES THE ROUND';
    }

    // mostrar imagen del ganador
    if (player === 'X') {
      winXImg.classList.remove('hidden');
      winXImg.classList.add('flex');
      winOImg.classList.add('hidden');
      winOImg.classList.remove('flex');
    } else {
      winOImg.classList.remove('hidden');
      winOImg.classList.add('flex');
      winXImg.classList.add('hidden');
      winXImg.classList.remove('flex');
    }

    if (overlay) overlay.classList.remove('hidden');
  }

  function showTie() {
    if (winnerText) winnerText.textContent = 'TIE';

    // ocultar ambas imágenes en caso de empate
    winXImg.classList.add('hidden');
    winXImg.classList.remove('flex');
    winOImg.classList.add('hidden');
    winOImg.classList.remove('flex');

    if (overlay) overlay.classList.remove('hidden');
  }

  function resetBoard() {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }

    for (let j = 0; j < celdas.length; j++) {
      let imgX = celdas[j].querySelector('.uno');
      let imgO = celdas[j].querySelector('.dos');
      if (imgX) imgX.classList.add('hidden');
      if (imgO) imgO.classList.add('hidden');
      celdas[j].style.pointerEvents = '';
    }

    // ocultar imágenes de victoria
    winXImg.classList.add('hidden');
    winXImg.classList.remove('flex');
    winOImg.classList.add('hidden');
    winOImg.classList.remove('flex');

    turno = 'X';
    gameOver = false;
    updateTurnUI();
  }

  function updateTurnUI() {
    if (!turnX || !turnO) return;
    if (turno === 'X') {
      turnX.classList.remove('hidden');
      turnX.classList.add('flex');
      turnO.classList.remove('flex');
      turnO.classList.add('hidden');
    } else {
      turnO.classList.remove('hidden');
      turnO.classList.add('flex');
      turnX.classList.remove('flex');
      turnX.classList.add('hidden');
    }
  }
}
