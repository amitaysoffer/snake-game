let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let appleLocationX;
let appleLocationY;
const appleSizeX = 20;
const appleSizeY = 20;
const snakeSizeX = 20;
const snakeSizeY = 20;

let gameLevel = 'normal';
let isMoveSnakeStart = false

let isMoveUp = true
let isMoveDown = true
let isMoveRight = false
let isMoveLeft = false

// Snake start values
let body = [
  { x: 60, y: 100 },
  { x: 40, y: 100 },
  { x: 20, y: 100 },
  { x: 0, y: 100 }
]
let bodyCopy = [
  { x: 60, y: 100 },
  { x: 40, y: 100 },
  { x: 20, y: 100 },
  { x: 0, y: 100 }
]
let directionX = 20;
let directionY = 0;

let score = 0

appleReset();
drawEverything();

function gameStart() {
  runGame = setInterval(function () {
    if (isMoveSnakeStart) {
      moveSnake();
    }
    drawEverything();
  }, 50);
}
gameStart();

function gameOver() {
  clearInterval(runGame);
  const modal = document.getElementById("myModal");
  modal.style.display = "block";

  isMoveUp = false
  isMoveDown = false
  isMoveRight = false
  isMoveLeft = false

  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {

      modal.style.display = "none";
      body = [
        { x: 60, y: 100 },
        { x: 40, y: 100 },
        { x: 20, y: 100 },
        { x: 0, y: 100 }
      ]
      bodyCopy = [
        { x: 60, y: 100 },
        { x: 40, y: 100 },
        { x: 20, y: 100 },
        { x: 0, y: 100 }
      ]
      directionX = 20;
      directionY = 0;
      isMoveSnakeStart = false
      document.querySelector('span').innerHTML = '0'

      isMoveUp = true
      isMoveDown = true
      isMoveRight = false
      isMoveLeft = false

      gameStart();
      appleReset();
    }
  }
}
function toggle(level) {
  if (level === 'easy') {
    document.getElementById('canvas').style.border = '10px solid black';
    gameLevel = 'easy'
  } else {
    document.getElementById('canvas').style.border = '3px solid black';
    gameLevel = 'normal'
  }
}

function moveSnake() {
  body[0].x += directionX;
  body[0].y += directionY;

  keepBodyCloseToHead();
  // keeps snake inside the game borders
  if (gameLevel === 'easy') {
    snakeRemainInBorders();
  } else {
    snakeCantTouchBorder();
  }
  // Snake head hits the body
  snakeHitOwnBody();
  // Snake hits the apple
  if (body[0].x === appleLocationX && body[0].y === appleLocationY) {
    appleReset();
    addBodyPartsToSnake();

    document.querySelector('span').innerHTML++
    score++
  }
}

function keepBodyCloseToHead() {
  for (let i = 1; body.length > i; i++) {
    // Attach snake to head
    body[i].x = bodyCopy[i - 1].x
    body[i].y = bodyCopy[i - 1].y
  }
  // Copy the original body settings to the bodyCopy
  for (let j = 0; bodyCopy.length > j; j++) {
    bodyCopy[j].x = body[j].x
    bodyCopy[j].y = body[j].y
  }
}

function snakeHitOwnBody() {
  for (let i = 1; body.length > i; i++) {
    if (body[0].x === body[i].x && body[0].y === body[i].y) {
      console.log('Head touched the body');
      gameOver();
    }
  }
}

function addBodyPartsToSnake() {
  // Top to Bottom
  if (body[body.length - 1].x === body[body.length - 2].x && body[body.length - 1].y < body[body.length - 2].y) {
    body.push({ x: body[body.length - 1].x, y: body[body.length - 1].y - snakeSizeY });

    bodyCopy.push({ x: bodyCopy[bodyCopy.length - 1].x, y: bodyCopy[bodyCopy.length - 1].y - snakeSizeY });
    // Bottom to Top
  } else if (body[body.length - 1].x === body[body.length - 2].x && body[body.length - 1].y > body[body.length - 2].y) {
    body.push({ x: body[body.length - 1].x, y: body[body.length - 1].y + snakeSizeY });

    bodyCopy.push({ x: bodyCopy[bodyCopy.length - 1].x, y: bodyCopy[bodyCopy.length - 1].y + snakeSizeY });
    // Right to Left
  } else if (body[body.length - 1].y === body[body.length - 2].y && body[body.length - 1].x > body[body.length - 2].x) {
    body.push({ x: body[body.length - 1].x + snakeSizeX, y: body[body.length - 1].y });

    bodyCopy.push({ x: bodyCopy[bodyCopy.length - 1].x + snakeSizeX, y: bodyCopy[bodyCopy.length - 1].y });
    // Left to Right
  } else if (body[body.length - 1].y === body[body.length - 2].y && body[body.length - 1].x < body[body.length - 2].x) {
    body.push({ x: body[body.length - 1].x - snakeSizeX, y: body[body.length - 1].y });

    bodyCopy.push({ x: bodyCopy[bodyCopy.length - 1].x - snakeSizeX, y: bodyCopy[bodyCopy.length - 1].y });
  }
};

function renderSnake() {
  for (let k = 0; body.length > k; k++) {
    renderRect(body[k].x, body[k].y, snakeSizeX, snakeSizeY, "green");
  }
}

function drawEverything() {
  // Canvas
  renderRect(0, 0, canvas.width, canvas.height, "lightblue");
  // Snake
  renderSnake();
  // Apple
  renderRect(appleLocationX, appleLocationY, appleSizeX, appleSizeY, 'red')
}

function renderRect(leftX, topY, width, height, drawColor) {
  ctx.fillStyle = drawColor;
  ctx.fillRect(leftX, topY, width, height);
}

function appleReset() {
  appleLocationX = Math.floor((Math.random() * canvas.width) + 1);
  appleLocationY = Math.floor((Math.random() * canvas.height) + 1);

  // Verify sure apple doesn't render out of canvas
  appleLocationX = appleLocationX > 780 ? 780 : appleLocationX
  appleLocationY = appleLocationY > 580 ? 580 : appleLocationY

  // Verify apple is in the grid system
  while (appleLocationY / 20 % 1) {
    appleLocationY = appleLocationY + 1
  }
  while (appleLocationX / 20 % 1) {
    appleLocationX = appleLocationX + 1
  }

  // Verify apple doesn't render on the snake
  for (let i = 0; body.length > i; i++) {
    for (let k = 0; body.length > k; k++) {
      if (appleLocationX === body[i].x && appleLocationY === body[k].y) {
        console.log('Apple touched Snake when renders')
        appleReset();
      }
    }
  }
}

// Moving the snake with arrows 
document.addEventListener("keydown", function (e) {
  // debugger;
  if (e.which === 39) {
    // right
    if (isMoveRight) {
      directionX = 20;
      directionY = 0;
    }
    isMoveRight = false;
    isMoveLeft = false;
    isMoveUp = true;
    isMoveDown = true;
    // isMoveDownUp = true
    isMoveSnakeStart = true
  }
  if (e.which === 37) {
    // left
    if (isMoveLeft) {
      directionX = -20;
      directionY = 0;
    }
    isMoveRight = false;
    isMoveLeft = false;
    isMoveUp = true;
    isMoveDown = true;

    isMoveSnakeStart = true
  }
  if (e.which === 38) {
    // up
    if (isMoveUp) {
      directionX = 0;
      directionY = -20;
    }
    isMoveSnakeStart = true

    isMoveRight = true;
    isMoveLeft = true;
    isMoveUp = false;
    isMoveDown = false;
  }
  if (e.which === 40) {
    // down
    if (isMoveDown) {
      // debugger;
      directionX = 0;
      directionY = 20;
    }
    isMoveSnakeStart = true

    isMoveRight = true;
    isMoveLeft = true;
    isMoveUp = false;
    isMoveDown = false;
  }
})

function snakeCantTouchBorder() {
  if (body[0].y >= 0 && body[0].y <= canvas.height && body[0].x == -snakeSizeX) {
    // Left side
    gameOver();
  }
  else if (body[0].x >= 0 && body[0].x <= canvas.width && body[0].y == -snakeSizeY) {
    // Top side
    gameOver();
  } else if (body[0].x == canvas.width && body[0].y >= 0 &&
    body[0].y <= canvas.height) {
    // Right side
    gameOver();
  }
  else if (body[0].x >= 0 && body[0].x <= canvas.width && body[0].y == canvas.height) {
    // Bottom side
    gameOver();
  }
}

// Prevent snake from going off canvas
function snakeRemainInBorders() {
  if (body[0].y >= snakeSizeY && body[0].y <= canvas.height &&
    body[0].x >= 0 && body[0].x < snakeSizeX) {
    // Left side
    if (isMoveUp) {
      directionX = 0;
      directionY = -20;
    }
    isMoveRight = true;
    isMoveLeft = false;
    isMoveUp = false;
    isMoveDown = false;
  }
  else if (body[0].x >= 0 && body[0].x < canvas.width - snakeSizeX
    && body[0].y >= 0 && body[0].y < snakeSizeY) {
    // Top side
    if (isMoveRight) {
      directionX = 20;
      directionY = 0;
    }
    isMoveRight = false;
    isMoveLeft = false;
    isMoveUp = false;
    isMoveDown = true;
  } else if (body[0].x >= canvas.width - snakeSizeX && body[0].y >= 0 && body[0].y < canvas.height - snakeSizeY) {
    // Right side
    if (isMoveDown) {
      directionX = 0;
      directionY = 20;
    }
    isMoveRight = false;
    isMoveLeft = true;
    isMoveUp = false;
    isMoveDown = false;
  }
  else if (body[0].x <= canvas.width - snakeSizeX && body[0].x >= 0
    && body[0].y >= canvas.height - snakeSizeY && body[0].y <= canvas.height) {
    // Bottom side
    if (isMoveLeft) {
      directionX = -20;
      directionY = 0;
    }
    isMoveRight = false;
    isMoveLeft = false;
    isMoveUp = true;
    isMoveDown = false;
  }
}

