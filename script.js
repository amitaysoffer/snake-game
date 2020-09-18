let canvas;
let canvasContext;
let snakeSpeedX = 2;
let snakeSpeedY = 0;

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  appleReset();
  drawEverything();
  setInterval(function () {
    moveSnake();
    // moveApple();
    drawEverything();
    addBodyToSnake();
  }, 10)
};

function moveSnake() {
  // debugger
  snakeLocationX = snakeLocationX + snakeSpeedX;
  snakeLocationY = snakeLocationY + snakeSpeedY;

  // keeps snake inside the game borders
  if (snakeLocationX < 0) {
    snakeSpeedX = -snakeSpeedX
  }
  if (snakeLocationX > canvas.width - snakeSizeX) {
    snakeSpeedX = -snakeSpeedX
  }
  if (snakeLocationY < 0) {
    snakeSpeedY = -snakeSpeedY
  }
  if (snakeLocationY > canvas.height - snakeSizeY) {
    snakeSpeedY = -snakeSpeedY
  }

  // snake hits the apple
  if (snakeLocationX + snakeSizeX >= appleLocationX && snakeLocationX <= appleLocationX + appleSizeX &&
    snakeLocationY + snakeSizeY >= appleLocationY && snakeLocationY <= appleLocationY + appleSizeY) {
    appleReset();
    // addBodyToSnake();
    console.log('I hit the apple!')
    // debugger
  }
}


function addBodyToSnake() {
  // Tale of snake

  renderRect(snakeLocationX - snakeSizeX - snakeSizeX - taleSizeX, snakeLocationY, snakeSizeX, snakeSizeY, 'green')
  // renderRect(snakeLocationX - snakeSizeX - snakeSizeX, snakeLocationY, snakeSizeX, snakeSizeY, 'green')
  // renderRect(snakeLocationX - snakeSizeX - snakeSizeX  , snakeLocationY, snakeSizeX, snakeSizeY, 'green')
  // renderRect(snakeLocationX - snakeSizeX - 50, snakeLocationY, snakeSizeX, snakeSizeY, 'green')
  // renderRect(0, 50, 50, 50, 'green')

  // debugger;
  // snakeSizeX += 30
  // snakeSizeY += 20
}



let snakeLocationX = 200;
let snakeLocationY = 300;
let snakeSizeX = 30
let snakeSizeY = 30

let taleSizeX = 10;
let taleSizeY = 10;

// Apple settings
let appleLocationX;
let appleLocationY;
let appleSizeX = 30;
let appleSizeY = 30;


function drawEverything() {
  // Board
  renderRect(0, 0, canvas.width, canvas.height, 'black')
  // Snake
  // renderApple(appleLocationX, appleLocationY, 20, 'white');
  renderRect(snakeLocationX, snakeLocationY, snakeSizeX, snakeSizeY, 'blue')
  // Apple
  renderRect(appleLocationX, appleLocationY, appleSizeX, appleSizeY, 'red')
  // draw tale
  // renderRect(snakeLocationX - snakeSizeX, snakeLocationY, snakeSizeX, snakeSizeY, 'green')
  // renderRect(snakeLocationX - snakeSizeX * 2, snakeLocationY, snakeSizeX, snakeSizeY, 'green')
}

function renderRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor
  canvasContext.fillRect(leftX, topY, width, height);
}


let isMoveDownUp = true
let isMoveRightLeft = false

// Moving the snake with arrows 
document.addEventListener("keydown", function (e) {
  // console.log('right click')
  if (e.which === 39) {
    if (isMoveRightLeft) {
      snakeSpeedX = 2;
      snakeSpeedY = 0;
      taleSizeX = taleSizeX + 20
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
  }
  if (e.which === 37) {
    // console.log('left click')
    if (isMoveRightLeft) {
      snakeSpeedX = -2;
      snakeSpeedY = 0;
      taleSizeX = taleSizeX + 20
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
    // snakeLocationX = snakeLocationX - snakeSizeX
  }
  if (e.which === 38) {
    // console.log('up click')
    if (isMoveDownUp) {
      snakeSpeedY = -2;
      snakeSpeedX = 0;
      taleSizeX = taleSizeX - 20
    }
    isMoveDownUp = false
    isMoveRightLeft = true;
    // snakeLocationY = snakeLocationY - snakeSizeY
  }
  if (e.which === 40) {
    // console.log('down click')
    if (isMoveDownUp) {
      snakeSpeedY = 2;
      snakeSpeedX = 0;
      taleSizeX = taleSizeX - 20
    }
    isMoveDownUp = false
    isMoveRightLeft = true;
    // snakeLocationY = snakeLocationY + snakeSizeY
  }
})


function appleReset() {
  // if (snakeLocationX === appleLocationX && snakeLocationY === appleLocationY) {
  // debugger
  appleLocationX = Math.floor((Math.random() * canvas.width) + 1);
  appleLocationY = Math.floor((Math.random() * canvas.height) + 1);
  // Make sure new apple doens't go out of bounds
  if (appleLocationX > canvas.width - appleSizeX) {
    appleLocationX = appleLocationX - appleSizeX
  }
  if (appleLocationY > canvas.height - appleSizeY) {
    appleLocationY = appleLocationY - appleSizeY
  }
  // console.log(appleLocationX)
  // console.log(appleLocationY)
}

function renderApple(leftX, topY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(leftX, topY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}