const images = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const memoryGrid = document.getElementById('memoryGrid');
const startButton = document.getElementById('startButton');

let cards = [];
let activeCards = [];
let matches = 0;
let flipDelay = false;

startButton.addEventListener('click', startGame);

function startGame() {
  cards = [];
  activeCards = [];
  matches = 0;
  flipDelay = false; // Reset flip delay
  startButton.disabled = true;

  const pairs = images.concat(images);
  pairs.sort(() => Math.random() - 0.5);

  memoryGrid.innerHTML = '';

  for (let i = 0; i < pairs.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card', 'card-cover');
    card.dataset.index = i;
    card.addEventListener('click', () => flipCard(card));
    card.textContent = pairs[i];
    cards.push(card);
    memoryGrid.appendChild(card);
  }
}

// ... Rest of the script ...

// ... Rest of the script ...

function flipCard(card) {
  if (!flipDelay && !card.classList.contains('matched') && activeCards.length < 2) {
    card.classList.toggle('active'); // Toggle the active class
    activeCards.push(card);

    if (activeCards.length === 2) {
      flipDelay = true; // Set the flag to delay flipping
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = activeCards;
  const feedback = document.getElementById('feedback');

  if (card1.textContent === card2.textContent) {
    card1.removeEventListener('click', () => flipCard(card1));
    card2.removeEventListener('click', () => flipCard(card2));
    matches++;

    if (matches === images.length) {
      feedback.textContent = 'Hai vinto!';
      startButton.disabled = false;
    } else {
      feedback.textContent = 'Coppia trovata!';
      feedback.style.color = 'green'; // Set the color to green for successful match
    }

    card1.classList.add('matched');
    card2.classList.add('matched');

    card1.classList.remove('active'); // Remove active class
    card2.classList.remove('active'); // Remove active class
  } else {
    feedback.textContent = 'Coppia non trovata';
    feedback.style.color = 'red'; // Set the color to red for unsuccessful match

    setTimeout(() => {
      feedback.textContent = '';
      card1.classList.remove('active'); // Remove active class
      card2.classList.remove('active'); // Remove active class
    }, 1000);

    card1.classList.add('card-cover'); // Reset card background
    card2.classList.add('card-cover'); // Reset card background
  }

  flipDelay = false;
  activeCards = [];
}

// ... Rest of the script ...
