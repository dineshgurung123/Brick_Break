const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const game = document.getElementById('game');
const gameOver = document.getElementById('gameOver');
const win = document.getElementById('win');
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');

let xSpeed = 3;
let ySpeed = -3;
let ballX = 240;
let ballY = 420;
let timer = null;

let hitSound = new Audio('sounds/tutu.wav');
let overSound = new Audio('sounds/over.wav');

function createBricks() {
  const rows = document.querySelectorAll('.brick-row');
  rows.forEach((row, i) => {
    for (let j = 0; j < 8; j++) {
      const brick = document.createElement('div');
      brick.className = 'brick';
      if (Math.random() < 0.2) {
        brick.style.backgroundColor = '#00f2ff'; // random surprise brick
        brick.dataset.random = "true";
      }
      row.appendChild(brick);
    }
  });
}

createBricks();

document.addEventListener('keydown', function (e) {
  if (e.key === "ArrowRight" && paddle.offsetLeft + paddle.offsetWidth < game.offsetWidth) {
    paddle.style.left = paddle.offsetLeft + 20 + "px";
  } else if (e.key === "ArrowLeft" && paddle.offsetLeft > 0) {
    paddle.style.left = paddle.offsetLeft - 20 + "px";
  }
});

function moveBall() {
  ballX += xSpeed;
  ballY += ySpeed;

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  if (ballX <= 0 || ballX + ball.offsetWidth >= 500) xSpeed *= -1;
  if (ballY <= 0) ySpeed *= -1;

  // Paddle bounce
  if (
    ballY + ball.offsetHeight >= paddle.offsetTop &&
    ballX + ball.offsetWidth >= paddle.offsetLeft &&
    ballX <= paddle.offsetLeft + paddle.offsetWidth
  ) {
    ySpeed *= -1;
    hitSound.play();
  }

  // Bricks
  const bricks = document.querySelectorAll('.brick');
  bricks.forEach(brick => {
    if (brick.style.visibility !== 'hidden') {
      const bTop = brick.offsetTop;
      const bLeft = brick.offsetLeft;
      const bRight = bLeft + brick.offsetWidth;
      const bBottom = bTop + brick.offsetHeight;

      if (
        ballX + ball.offsetWidth > bLeft &&
        ballX < bRight &&
        ballY < bBottom &&
        ballY + ball.offsetHeight > bTop
      ) {
        brick.style.visibility = 'hidden';
        ySpeed *= -1;
        hitSound.play();

        if (brick.dataset.random) {
          xSpeed += 0.5; // Add challenge
        }
      }
    }
  });

  // Win
  const visible = [...bricks].some(b => b.style.visibility !== 'hidden');
  if (!visible) {
    clearInterval(timer);
    win.style.visibility = 'visible';
  }

  // Game Over
  if (ballY > 500) {
    clearInterval(timer);
    gameOver.style.visibility = 'visible';
    overSound.play();
  }
}

function startGame() {
  if (timer) return;
  timer = setInterval(moveBall, 20);
}

function resetGame() {
  clearInterval(timer);
  timer = null;
  ballX = 240;
  ballY = 420;
  xSpeed = 3;
  ySpeed = -3;
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
  paddle.style.left = "50%";
  gameOver.style.visibility = 'hidden';
  win.style.visibility = 'hidden';

  document.querySelectorAll('.brick-row').forEach(row => (row.innerHTML = ''));
  createBricks();
}

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
