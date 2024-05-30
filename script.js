'use strict';

const message = document.querySelector('.message');
const number = document.querySelector('.number');
const score = document.querySelector('.score');
const guess = document.querySelector('.guess');
const highscoreElement = document.querySelector('.highscore');
const checkButton = document.querySelector('.check');

let points = 20;
let highscore = 0;
let randomNumber = Math.trunc(Math.random()*20)+1;

checkButton.addEventListener('click', () => {
	const guessValue = Number(guess.value);
	
	switch (true) {
		case guessValue < 0 || guessValue > 20:
			displayMessage('Only numbers between 0 and 20!');
			break;
		case !guessValue:
			displayMessage('No number!')
			break;
		case guessValue === randomNumber:
			winPanel();
			break;
		case guessValue > randomNumber:
			displayMessage('Too high!')
			decreaseScore();
			break;
		case guessValue < randomNumber:
			displayMessage('Too low!');
			decreaseScore();
			break;
	}
});

const resetButton = document.querySelector('.again');
resetButton.addEventListener('click', () => {
	document.querySelector('body').style.backgroundColor = '#222';
	number.style.width = '15rem';
	number.textContent = '?';
	points = 20;
	score.textContent = String(points);
	guess.value = '';
	displayMessage('Start Guessing...')
	randomNumber = Math.trunc(Math.random()*20)+1;
});


function decreaseScore() {
	score.textContent = String(--points);
	if(points === 0) {
		displayMessage('You lost the game!');
		checkButton.disabled = true;
	}
};

function displayMessage(text) {
	message.textContent = text;
}

function winPanel() {
	document.querySelector('body').style.backgroundColor = '#60b347';
	displayMessage('Correct number!')
	number.style.width = '30rem';
	number.textContent = String(randomNumber);
	if(points > highscore) {
		highscore = points;
		highscoreElement.textContent = String(highscore);
	}
}