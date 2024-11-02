// Логика игры "Змейка"
document.addEventListener('DOMContentLoaded', (event) => {
const canvas = document.getElementById('snakeGame');
const startButton = document.getElementById('startGame');
const restartButton = document.getElementById('restartGame');
let game;

if (!canvas) {
console.error('Canvas element not found!');
return;
}

const ctx = canvas.getContext('2d');
if (!ctx) {
console.error('Unable to get canvas context!');
return;
}

const box = 20;
let snake = [];
let food;
let score;
let d;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

function startGame() {
canvas.style.display = 'block';
startButton.style.display = 'none';
restartButton.style.display = 'none';
snake = [{ x: 9 * box, y: 10 * box }];
food = {
x: Math.floor(Math.random() * 19 + 1) * box,
y: Math.floor(Math.random() * 19 + 1) * box
};
score = 0;
d = 'RIGHT'; // Начальное направление движения змейки
document.addEventListener('keydown', direction);
game = setInterval(draw, 100);
}

function direction(event) {
if (event.key === 'a' && d != 'RIGHT') {
d = 'LEFT';
} else if (event.key === 'w' && d != 'DOWN') {
d = 'UP';
} else if (event.key === 'd' && d != 'LEFT') {
d = 'RIGHT';
} else if (event.key === 's' && d != 'UP') {
d = 'DOWN';
}
}

function collision(head, array) {
for (let i = 0; i < array.length; i++) {
if (head.x == array[i].x && head.y == array[i].y) {
return true;
}
}
return false;
}

function draw() {
ctx.fillStyle = 'lightgreen';
ctx.fillRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i < snake.length; i++) {
let gradient = Math.min(255, 255 - (i * 5));
ctx.fillStyle = `rgb(64, 224, ${208 + gradient})`; // Бирюзовый цвет с градиентом
ctx.fillRect(snake[i].x, snake[i].y, box, box);

ctx.strokeStyle = 'red';
ctx.strokeRect(snake[i].x, snake[i].y, box, box);
}

ctx.fillStyle = 'red';
ctx.fillRect(food.x, food.y, box, box);

let snakeX = snake[0].x;
let snakeY = snake[0].y;

if (d == 'LEFT') snakeX -= box;
if (d == 'UP') snakeY -= box;
if (d == 'RIGHT') snakeX += box;
if (d == 'DOWN') snakeY += box;

if (snakeX == food.x && snakeY == food.y) {
score++;
food = {
x: Math.floor(Math.random() * 19 + 1) * box,
y: Math.floor(Math.random() * 19 + 1) * box
};
} else {
snake.pop();
}

let newHead = {
x: snakeX,
y: snakeY
};

if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
clearInterval(game);
gameOver();
}

snake.unshift(newHead);

ctx.fillStyle = 'white';
ctx.font = '45px Changa one';
ctx.fillText(score, 2 * box, 1.6 * box);
}

function gameOver() {
ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = 'red';
ctx.font = '75px Changa one';
ctx.fillText('Game Over', canvas.width / 4, canvas.height / 2);

// Анимация "Game Over"
let opacity = 0;
let fadeOut = setInterval(() => {
ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
ctx.fillRect(0, 0, canvas.width, canvas.height);
opacity += 0.05;
if (opacity >= 1) {
clearInterval(fadeOut);
restartButton.style.display = 'block';
}
}, 50);
}
});
document.addEventListener('DOMContentLoaded', () => {
const changeUsernameBtn = document.getElementById('changeUsernameBtn');
const usernameSpan = document.getElementById('username');

changeUsernameBtn.addEventListener('click', () => {
const newUsername = prompt('Введите новый ник:');
if (newUsername) {
usernameSpan.textContent = newUsername;
changeUsernameBtn.disabled = true; // Отключаем кнопку после изменения ника
}
});
});
// scripts.js
document.addEventListener('DOMContentLoaded', () => {
const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');
const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let apple = spawnApple();
let score = 0;

function spawnApple() {
return {
x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
};
}

function drawApple() {
ctx.fillStyle = 'red';
ctx.fillRect(apple.x, apple.y, gridSize, gridSize);
}

function drawSnake() {
ctx.fillStyle = 'green';
snake.forEach(segment => {
ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
});
}

function update() {
const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
snake.unshift(head);

if (head.x === apple.x && head.y === apple.y) {
score++;
apple = spawnApple();
} else {
snake.pop();
}

if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
resetGame();
}
}

function resetGame() {
snake = [{ x: 200, y: 200 }];
direction = { x: 0, y: 0 };
score = 0;
apple = spawnApple();
}

function gameLoop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawSnake();
drawApple();
update();
}

document.addEventListener('keydown', event => {
switch (event.key) {
case 'ArrowUp':
if (direction.y === 0) direction = { x: 0, y: -gridSize };
break;
case 'ArrowDown':
if (direction.y === 0) direction = { x: 0, y: gridSize };
break;
case 'ArrowLeft':
if (direction.x === 0) direction = { x: -gridSize, y: 0 };
break;
case 'ArrowRight':
if (direction.x === 0) direction = { x: gridSize, y: 0 };
break;
}
});

setInterval(gameLoop, 100);

// Спавн яблок каждую секунду
setInterval(() => {
apple = spawnApple();
}, 1000);
});
