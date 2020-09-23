window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  appleReset();
  drawEverything();
  setInterval(function () {
    if (isMoveSnakeStart){
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

  // Hit the apple
  if (body[0].x + snakeSizeX >= appleLocationX && body[0].x <= appleLocationX + appleSizeX &&
    body[0].y + snakeSizeY >= appleLocationY && body[0].y <= appleLocationY + appleSizeY) {

    appleReset();
    addBodyPartToSnake();
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


function addBodyPartToSnake() {
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
  debugger
  appleLocationX = Math.floor((Math.random() * canvas.width) + 1);
  appleLocationY = Math.floor((Math.random() * canvas.height) + 1);
  // Make sure new apple doens't go out of bounds
  if (appleLocationX > canvas.width - appleSizeX) {
    appleLocationX = appleLocationX - appleSizeX
  }
  if (appleLocationY > canvas.height - appleSizeY) {
    appleLocationY = appleLocationY - appleSizeY
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
      directionY = 0;
      directionX = 20;
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
    isMoveSnakeStart = true
  }
  if (e.which === 37) {
    // left
    if (isMoveRightLeft) {
      directionY = 0;
      directionX = -20;
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
    isMoveSnakeStart = true
  }
  if (e.which === 38) {
    // up
    if (isMoveDownUp) {
      directionY = -20;
      directionX = 0;
    }
    isMoveSnakeStart = true
    isMoveDownUp = false
    isMoveRightLeft = true;
  }
  if (e.which === 40) {
    // down
    if (isMoveDownUp) {
      // debugger;
      directionY = 20;
      directionX = 0;
    }
    isMoveSnakeStart = true
    isMoveDownUp = false
    isMoveRightLeft = true;
  }
})

function snakeRemainInBorders() {
  // console.log(body[0].y)
  if (body[0].x <= 0 && body[0].y <= canvas.height) {
    // Left side
    // debugger;
    // restartGame()
    // directionX = -directionX
    directionX = 0;
    directionY = -20;
    // console.log('touched the sides')
  }
  else if (body[0].x >= canvas.width - snakeSizeX && body[0].y <= canvas.height) {
    // Right side
    // restartGame()
    // debugger;
    // directionX = -directionX
    directionX = 0;
    directionY = 20;
    // console.log('touched the sides')
  }
  else if (body[0].y <= 0 && body[0].x <= 0) {
    // Top side
    // restartGame()
    // debugger;
    // directionY = -directionY
    directionX = 20;
    directionY = 0;
    // console.log('touched the sides')
  }
  else if (body[0].y >= canvas.height - snakeSizeY && body[0].x <= canvas.width) {
    // Bottom side
    // debugger;
    // restartGame()
    // directionY = -directionY
    directionY = 0;
    directionX = -20;
    // console.log('touched the sides')
  }
}
