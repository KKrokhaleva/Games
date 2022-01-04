'use strict'

const icon = document.querySelector('#icon');
const mandarinsAmountElement = document.querySelector('#mandarinsAmount');
const startButton = document.querySelector('#startButton');
const gameTime = document.querySelector('#gameTime');
const mandarin = document.querySelector('#mandarin');
const grinch = document.querySelector('#grinch');

let mandarinsAmount = 0;
let gameDuration = 15;
let gameInterval;
let mandarinInterval;
let grinchInterval;
let grinchIntervalDelay;

icon.addEventListener('click',() => {
    mandarinsAmount++;
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarin`;
    setMandarinPosition();
    clearInterval(mandarinInterval);
    mandarinInterval = setInterval(setMandarinPosition, 1000);
});

grinch.addEventListener('click', () =>{
    gameDuration = 15;
    gameTime.textContent ='Game over!';
    icon.style.display = 'none';
    clearInterval(mandarinInterval);
    clearInterval (gameInterval);
    mandarinsAmount--;
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarin`;
})

function resetGame() {
    gameDuration = 15;
    mandarinsAmount = 0;
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarin`;
    gameTime.textContent = `${gameDuration} seconds left`;
}

 function setMandarinPosition() {
    icon.style.left = Math.round(Math.random()*274) + 'px ';
    icon.style.top = Math.round(Math.random()*274) + 'px ';

    if(gameDuration === grinchIntervalDelay){
        mandarin.style.display = 'none';
        grinch.style.display = 'block';
        grinchIntervalDelay = Math.round( Math.random() * gameDuration );
        console.log(grinchIntervalDelay);
    } else {
        mandarin.style.display = 'block';
        grinch.style.display = 'none';
    }
}

function startGame() {
    if (gameDuration === 1) {
        icon.style.display = 'none';
        gameTime.textContent = `Game Over!`;
        clearInterval (gameInterval);
        clearInterval (mandarinInterval);
        return;
    }

    gameDuration -= 1;
    gameTime.textContent = `${gameDuration} seconds left`;

}

function startGameNew() {
    setMandarinPosition();
    icon.style.display = 'block';
    resetGame();
    grinchIntervalDelay = Math.round( Math.random() * gameDuration );
    console.log(grinchIntervalDelay);
    mandarinInterval = setInterval(setMandarinPosition, 1000);
    gameInterval = setInterval (startGame, 1000);
    startButton.removeEventListener('click', startGameNew);
}

startButton.addEventListener('click', startGameNew);

