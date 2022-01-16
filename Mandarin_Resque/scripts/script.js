// Mandarin Resque

'use strict';
// Находим все необходимые элементы
const icon = document.querySelector('#icon');
const mandarinsAmountElement = document.querySelector('#mandarinsAmount');
const startButton = document.querySelector('#startButton');
const gameTime = document.querySelector('#gameTime');
const mandarin = document.querySelector('.mandarin');
const grinch = document.querySelector('#grinch');
const restartButton = document.querySelector('#restartButton');
const professionalLevel = document.querySelector('#levelThree');
const experiencedLevel = document.querySelector('#levelTwo');
const beginnerLevel = document.querySelector('#levelOne');
const canvas = document.querySelector('.game-canvas');

// Объявляем все переменные
let gameInterval;
let mandarinsAmount = 0;
let gameDuration = 60;
let mandarinInterval;
let grinchIntervalDelay;
let interval;
let canvasWidth;
let canvasHeight;
let mandarinWidth;
let mandarinHeight;

// Функция поведения счетчика и мандаринки
mandarin.addEventListener('click', event => {
    mandarinsAmount++;
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarins`;
    setMandarinPosition();
    clearInterval(mandarinInterval);
    mandarinInterval = setInterval(setMandarinPosition, interval);
});

// Функция поведения счетчика и гринча
grinch.addEventListener('click', () => {
    gameDuration = 60;
    gameTime.textContent = `Game over!`;
    icon.style.display = 'none';
    clearInterval(mandarinInterval);
    clearInterval(gameInterval);
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarins`;
    startButton.removeAttribute('disabled');
});
// Функция обнуления игры
function resetGame () {
    gameDuration = 60;
    mandarinsAmount = 0;
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarins`;
    gameTime.textContent = `${gameDuration} seconds left`
}
// Функция, которая меняет положение мандаринки и гринча
function setMandarinPosition () {
    canvasWidth = canvas.offsetWidth;
    mandarinWidth = mandarin.width;
    canvasHeight = canvas.offsetHeight;
    mandarinHeight = mandarin.height;
    icon.style.left = Math.round(Math.random() * (100-mandarinWidth/canvasWidth*100)) + '%';
    icon.style.top = Math.round(Math.random() * (100-mandarinHeight/canvasHeight*100)) + '%';

    if(gameDuration === grinchIntervalDelay) {
        mandarin.style.display = 'none';
        grinch.style.display = 'block';
        grinchIntervalDelay = Math.round(Math.random() * gameDuration);
    } else {
        mandarin.style.display = 'block';
        grinch.style.display = 'none';
    }
}
// Функция счетчика игры
function gameCount () {
    if(gameDuration === 1) {
        icon.style.display = 'none';
        gameTime.textContent = `Game over!`;
        clearInterval(gameInterval);
        clearInterval(mandarinInterval);
        startButton.removeAttribute('disabled');
        return;
    }
    gameDuration -= 1;
    gameTime.textContent = `${gameDuration} seconds left`;
}

// Функция выбора уровня сложности
function checkLevel () {
    interval =1200;
    professionalLevel.addEventListener("click", ()=>{
        interval =500;
    })
    experiencedLevel.addEventListener("click", ()=>{
        interval =800;
    })
    beginnerLevel.addEventListener("click", ()=>{
        interval =1200;
    })
    return interval;
}
interval = checkLevel ();

// Функция старта игры
function startGame() {
    startButton.setAttribute('disabled', 'disabled');
    setMandarinPosition();
    icon.style.display = 'block';
    resetGame();
    grinchIntervalDelay = Math.round(Math.random() * gameDuration);
    mandarinInterval = setInterval(setMandarinPosition, interval );
    gameInterval = setInterval(gameCount, 1000);
}

// Функция старта игры при клике на старт
startButton.addEventListener('click', startGame);

// Функция рестарта игры при клике на рестарт
restartButton.addEventListener('click', event => {
    clearInterval(gameInterval);
    clearInterval(mandarinInterval);
    startGame()
});

