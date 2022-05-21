'use strict';

// we have to select the element where the event should happen
// - here, it's the Check! btn
// - and here we add the event listener

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

function guessMyNumberLogic() {
  const guess = document.querySelector('.guess').value;
  console.log(guess, typeof guess);

  if (!guess) {
    // empty input field
    displayMessage('Toto není číslo!');
    return;
  }

  if (guess < secretNumber) {
    displayMessage('Nízký odhad.');
    actualScore--;
  } else if (guess > secretNumber) {
    displayMessage('Vysoký odhad.');
    actualScore--;
  } else {
    // winner move =:)
    isWinner = true;

    if (actualScore > highScore) {
      highScore = actualScore;
      document.querySelector('.highscore').textContent = highScore;
    }

    displayMessage(`Správné číslo!`);
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
  }

  if (actualScore < 1) {
    displayMessage('Prohrál jsi, saláte!');
    document.querySelector('body').style.backgroundColor = '#aa1111';
  }
  displayScore(actualScore);
}

function resetGame() {
  // reset .message, .score;
  // if the previous game was winner...
  if (isWinner) {
    isWinner = false;
  }

  secretNumber = getSecretNumber();

  actualScore = // initial score in html code is: '?'
    typeof document.querySelector('.score').textContent === 'string'
      ? initScore
      : document.querySelector('.score').textContent;

  displayMessage('Začni hádat...');
  displayScore(initScore);
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';

  document.querySelector('body').style.backgroundColor = 'black';
}

function getSecretNumber() {
  return Math.trunc(Math.random() * initScore) + 1;
}

// --- setup of basic settings ---

const initScore = 20;
let highScore = 0;
let isWinner = false;
let secretNumber = undefined;
let actualScore = undefined; // initial score in html code is: '??'

resetGame();
// --- calling the functions ---

// handle the <Check> btn
document.querySelector('.check').addEventListener('click', guessMyNumberLogic);

// handle the <Again!> btn
document.querySelector('.again').addEventListener('click', resetGame);
