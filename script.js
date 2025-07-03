const board = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');

let emojis = ['🍎','🍌','🍒','🍇','🥝','🍍'];
let grid = [...emojis, ...emojis]; // 6 pairs
let revealed = [];
let matched = [];
let moves = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = '';
  shuffle(grid).forEach((emoji, index) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.index = index;
    div.dataset.emoji = emoji;
    div.addEventListener('click', handleClick);
    board.appendChild(div);
  });
  moves = 0;
  updateMoves();
  revealed = [];
  matched = [];
}

function handleClick(e) {
  const card = e.target;
  const emoji = card.dataset.emoji;
  const index = card.dataset.index;

  if (revealed.length === 2 || card.classList.contains('revealed') || matched.includes(index)) return;

  card.textContent = emoji;
  card.classList.add('revealed');
  revealed.push({ card, emoji, index });

  if (revealed.length === 2) {
    moves++;
    updateMoves();
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = revealed;

  if (first.emoji === second.emoji) {
    matched.push(first.index, second.index);
    revealed = [];

    if (matched.length === grid.length) {
      setTimeout(() => {
        alert(`🎉 You matched all in ${moves} moves!`);
      }, 400);
    }
  } else {
    setTimeout(() => {
      first.card.textContent = '';
      second.card.textContent = '';
      first.card.classList.remove('revealed');
      second.card.classList.remove('revealed');
      revealed = [];
    }, 900);
  }
}

function updateMoves() {
  movesDisplay.textContent = `Moves: ${moves}`;
}

function resetGame() {
  createBoard();
}

createBoard();
