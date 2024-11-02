document.addEventListener('DOMContentLoaded', (event) => {
const canvas = document.getElementById('snakeGame');
const startButton = document.getElementById('startGame');
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

function startGame() {
canvas.style.display = 'block';
startButton.style.display = 'none';
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
if (opacity >= 1) clearInterval(fadeOut);
}, 50);
}
});
