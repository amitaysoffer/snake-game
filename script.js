window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  appleReset();
  drawEverything();
  setInterval(function () {
    if (isMoveSnakeStart) {
      moveSnake();
    }
    drawEverything();
  }, 50);
};

let isMoveSnakeStart = false

let canvas;
let canvasContext;

let snakeSizeX = 20;
let snakeSizeY = 20;


const body = [
  { x: 60, y: 100 },
  { x: 40, y: 100 },
  { x: 20, y: 100 },
  { x: 0, y: 100 }
]

const bodyCopy = [
  { x: 60, y: 100 },
  { x: 40, y: 100 },
  { x: 20, y: 100 },
  { x: 0, y: 100 }
]

let directionX = 20;
let directionY = 0;

function moveSnake() {
  // debugger
  body[0].x += directionX;
  body[0].y += directionY;

  keepBodyCloseToHead();

  // keeps snake inside the game borders
  snakeRemainInBorders();

  // Snake head hits the body
  snakeHitOwnBody();

  // Hit an apple
  if (body[0].x === appleLocationX && body[0].y === appleLocationY) {

    appleReset();
    addBodyPartsToSnake();
    document.getElementById('apple-list').innerText
    console.log('I hit the apple!')
    // debugger
  }
}

function keepBodyCloseToHead() {
  for (let i = 1; body.length > i; i++) {
    // Attach snake to head
    body[i].x = bodyCopy[i - 1].x
    body[i].y = bodyCopy[i - 1].y
  }
  // Copy the original body settings to the bodyCopy
  // debugger
  for (let j = 0; bodyCopy.length > j; j++) {
    bodyCopy[j].x = body[j].x
    bodyCopy[j].y = body[j].y
  }
}

function snakeHitOwnBody() {
  for (let i = 1; body.length > i; i++) {
    if (body[0].x === body[i].x && body[0].y === body[i].y) {
      // debugger;
      console.log('No touching the snake');
    }
  }
}

// function restartGame() {
//   console.log('You loose!');


//   body = [
//     { x: 50, y: 100 },
//     { x: 40, y: 100 },
//     { x: 30, y: 100 }
//   ]

//   bodyCopy = [
//     { x: 50, y: 100 },
//     { x: 40, y: 100 },
//     { x: 30, y: 100 }
//   ]
//   directionX = 20;
//   directionY = 0;
//   // drawEverything();

//   appleReset();
// }


function addBodyPartsToSnake() {
  if (body[0].x != body[1].x) {
    body.push({ x: body[body.length - 1].x - (body[0].x - body[1].x), y: body[0].y });
    // debugger;
    bodyCopy.push({ x: bodyCopy[bodyCopy.length - 1].x - (bodyCopy[0].x - bodyCopy[1].x), y: bodyCopy[0].y });
    // debugger
  } else {
    body.push({
      x: body[0].x, y: body[body.length - 1].y + (body[1].y - body[0].y)
    });

    bodyCopy.push({
      x: bodyCopy[0].x, y: bodyCopy[bodyCopy.length - 1].y + (bodyCopy[1].y - bodyCopy[0].y)
    });
    console.log(body.length)
    console.log(bodyCopy.length)
    // debugger
  }
}

// Apple settings
let appleLocationX;
let appleLocationY;
let appleSizeX = 20;
let appleSizeY = 20;

function renderSnake() {
  for (let k = 0; body.length > k; k++) {
    renderRect(body[k].x, body[k].y, snakeSizeX, snakeSizeY, "green");
  }
  // debugger
}

function drawEverything() {
  // Canvas
  renderRect(0, 0, canvas.width, canvas.height, "black");
  // Snake
  renderSnake();
  // Apple
  renderRect(appleLocationX, appleLocationY, appleSizeX, appleSizeY, 'red')
  // renderApple(appleLocationX, appleLocationY, 10, 'red')
}

function renderRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function appleReset() {
  appleLocationX = Math.floor((Math.random() * canvas.width) + 1);
  appleLocationY = Math.floor((Math.random() * canvas.height) + 1);


  // Make sure apple doesn't render out of canvas
  appleLocationX = appleLocationX > 780 ? 780 : appleLocationX
  appleLocationY = appleLocationY > 580 ? 580 : appleLocationY

  while ((appleLocationY / 20 % 1)) {
    appleLocationY = appleLocationY + 1
  }
  while ((appleLocationX / 20 % 1)) {
    appleLocationX = appleLocationX + 1
  }
}

// render a round apple
// function renderApple(leftX, topY, radius, drawColor) {
//   canvasContext.fillStyle = drawColor;
//   canvasContext.beginPath();
//   canvasContext.arc(leftX, topY, radius, 0, Math.PI * 2, true);
//   canvasContext.fill();
// }


let isMoveDownUp = true
let isMoveRightLeft = false
// Moving the snake with arrows 
document.addEventListener("keydown", function (e) {
  if (e.which === 39) {
    // right
    if (isMoveRightLeft) {
      directionX = 20;
      directionY = 0;
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
    isMoveSnakeStart = true
  }
  if (e.which === 37) {
    // left
    if (isMoveRightLeft) {
      directionX = -20;
      directionY = 0;
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
    isMoveSnakeStart = true
  }
  if (e.which === 38) {
    // up
    if (isMoveDownUp) {
      directionX = 0;
      directionY = -20;
    }
    isMoveSnakeStart = true
    isMoveDownUp = false
    isMoveRightLeft = true;
  }
  if (e.which === 40) {
    // down
    if (isMoveDownUp) {
      // debugger;
      directionX = 0;
      directionY = 20;
    }
    isMoveSnakeStart = true
    isMoveDownUp = false
    isMoveRightLeft = true;
  }
})

// Prevent snake from going off canvas
function snakeRemainInBorders() {
  if (body[0].y >= snakeSizeY && body[0].y <= canvas.height && body[0].x >= 0 && body[0].x < snakeSizeX) {
    // Left side
    if (isMoveDownUp) {
      directionX = 0;
      directionY = -20;
    }
    isMoveDownUp = false
    isMoveRightLeft = true;
  }
  else if (body[0].x >= 0 && body[0].x < canvas.width - snakeSizeX
    && body[0].y <= 0 && body[0].y <= snakeSizeY) {
    // debugger
    // Top side
    if (isMoveRightLeft) {
      directionX = 20;
      directionY = 0;
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
  } else if (body[0].x >= canvas.width - snakeSizeX && body[0].y >= 0 && body[0].y < canvas.height - snakeSizeY) {
    // Right side
    if (isMoveDownUp) {
      directionX = 0;
      directionY = 20;
    }
    isMoveDownUp = false
    isMoveRightLeft = true;
  }
  else if (body[0].x <= canvas.width - snakeSizeX && body[0].x >= 0
    && body[0].y >= canvas.height - snakeSizeY && body[0].y <= canvas.height) {
    // Bottom side
    if (isMoveRightLeft) {
      directionX = -20;
      directionY = 0;
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
  }
}

