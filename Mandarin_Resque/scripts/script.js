'use strict';

const icon = document.querySelector('#icon');
const mandarinsAmountElement = document.querySelector('#mandarinsAmount');
const startButton = document.querySelector('#startButton');
const gameTime = document.querySelector('#gameTime');
const mandarin = document.querySelector('#mandarin');
const grinch = document.querySelector('#grinch');
const restartButton = document.querySelector('#restartButton');


let gameInterval;
let mandarinsAmount = 0;
let gameDuration = 15;
let mandarinInterval;
let grinchIntervalDelay;

mandarin.addEventListener('click', event => {
    mandarinsAmount++;
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarins`;
    setMandarinPosition();
    clearInterval(mandarinInterval);
    mandarinInterval = setInterval(setMandarinPosition, 1000);
});

grinch.addEventListener('click', () => {
    gameDuration = 15;
    gameTime.textContent = `Game over!`;
    icon.style.display = 'none';
    clearInterval(mandarinInterval);
    clearInterval(gameInterval);
    mandarinsAmount--;
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarins`;
    startButton.removeAttribute('disabled');
});

function resetGame () {
    gameDuration = 15;
    mandarinsAmount = 0;
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarins`;
    gameTime.textContent = `${gameDuration} seconds left`
}

function setMandarinPosition () {
    icon.style.left = Math.round(Math.random() * 274) + 'px';
    icon.style.top = Math.round(Math.random() * 274) + 'px';

    if(gameDuration === grinchIntervalDelay) {
        mandarin.style.display = 'none';
        grinch.style.display = 'block';
        grinchIntervalDelay = Math.round(Math.random() * gameDuration);
    } else {
        mandarin.style.display = 'block';
        grinch.style.display = 'none';
    }
}

function gameCount () {
    if(gameDuration === 1) {
        icon.style.display = 'none';
        gameTime.textContent = `Game over!`;
        clearInterval(gameInterval);
        clearInterval(mandarinInterval);
        startButton.removeAttribute('disabled');
        return;
    }

    // todo: высчитать координату независимую от ширины холста

    gameDuration -= 1;
    gameTime.textContent = `${gameDuration} seconds left`;
}

function startGame() {
    startButton.setAttribute('disabled', 'disabled');
    setMandarinPosition();
    icon.style.display = 'block';
    resetGame();
    grinchIntervalDelay = Math.round(Math.random() * gameDuration);
    mandarinInterval = setInterval(setMandarinPosition, 1000);
    gameInterval = setInterval(gameCount, 1000);
}
startButton.addEventListener('click', startGame);

restartButton.addEventListener('click', event => {
    clearInterval(gameInterval);
    clearInterval(mandarinInterval);
    startGame()
});
