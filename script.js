const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
const paddle = new Paddle(150, 10, 'blue', canvas.width / 2 - 75, canvas.height - 10, 20);
const ball = new Ball('blue', 10, canvas.width / 2, canvas.height - 20, paddle);
const CAP_COLOR = [190, 85, 80];
let ballVelocity = { x: 10, y: -10 };
const brickCol = Math.floor(canvas.width / 15);
const brickRow = 5;
const brickWidth = 80;
const brickHeight = 25;
let requestTimerId = null;

let bricks = [];
for (let i = 0; i < brickRow; i++) {
  for (let j = 0; j < brickCol; j++) {
    bricks.push(new Brick(j * brickWidth + j * 3, i * brickHeight + i * 3, 'blue', brickWidth, brickHeight));
  }
}
function play(video) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.clientWidth, canvas.height);

  for (let i = 0; i < bricks.length; i++) {
    bricks[i].draw();
  }
  ball.draw();
  if (ball.x + ballVelocity.x < ball.radius || ball.x + ballVelocity.x + ball.radius > canvas.width) {
    ballVelocity.x *= -1;
  }
  if (ball.y + ballVelocity.y < ball.radius) {
    ballVelocity.y *= -1;
  } else if (ball.y + ballVelocity.y + ball.radius >= canvas.height) {
    if (ball.x + ballVelocity.x + ball.radius >= paddle.x && ball.x + ballVelocity.x - ball.radius <= paddle.x + paddle.width) {
      ballVelocity.y *= -1;
    } else {
      if (requestTimerId) {
        alert('Game over');
        window.location.reload();
        requestTimerId = null;
        cancelAnimationFrame(requestTimerId);
      }
    }
  }

  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].isVisible) {
      if (ball.y + ball.radius >= bricks[i].y && ball.y + ball.radius < bricks[i].y + bricks[i].height) {
        if (ball.x >= bricks[i].x && ball.x <= bricks[i].x + bricks[i].width) {
          bricks[i].isVisible = false;
          ballVelocity.y *= -1;
        }
      }
    }
  }
  ball.x += ballVelocity.x;
  ball.y += ballVelocity.y;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pointerLocations = getPointerPixels(imageData.data, 50, canvas.width, canvas.height, CAP_COLOR);
  const [x, y] = average(pointerLocations);

  paddle.draw();
  paddle.moveTo(x);
  requestAnimationFrame(() => play(video));
}

document.addEventListener('keydown', (evt) => {
  if (evt.key == 'ArrowRight' || evt.key == 'Right') {
    paddle.moveRight();
  } else if (evt.key === 'ArrowLeft' || evt.key === 'Left') {
    paddle.moveLeft();
  }
});

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    requestTimerId = requestAnimationFrame(() => play(video));
  })
  .catch((err) => console.error(err));
