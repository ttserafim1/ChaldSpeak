// Логика игры "Змейка"
document.addEventListener('DOMContentLoaded', (event) => {
const canvas = document.getElementById('snakeGame');
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
snake[0] = { x: 9 * box, y: 10 * box };
let food = {
x: Math.floor(Math.random() * 19 + 1) * box,
y: Math.floor(Math.random() * 19 + 1) * box
};
let score = 0;
let d;

document.addEventListener('keydown', direction);

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
ctx.fillStyle = (i == 0) ? 'green' : 'white';
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
}

snake.unshift(newHead);

ctx.fillStyle = 'white';
ctx.font = '45px Changa one';
ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);
});
