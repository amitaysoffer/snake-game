window.onload = function () {
  // debugger
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  // appleReset();
  drawEverything();
  setInterval(function () {
    moveSnake();
    // moveApple();
    drawEverything();
    // addBodyToSnake();
  }, 10)
};

let canvas;
let canvasContext;
let snakeSpeedX = 1;
let snakeSpeedY = 0;


// let snakeLocationX = 200;
// let snakeLocationY = 300;
let snakeSizeX = 30
let snakeSizeY = 30

const snake = {
  body: [
    { x: 200, y: 300 },
    { x: 100, y: 100 },
    { x: 20, y: 0 }
  ]
}


function moveSnake() {
  // move the snake head in the current direction
  snake.body[0].x += snakeSpeedX
  snake.body[0].y += snakeSpeedY

  snake.body[1].x = snake.body[0].x + 50
  snake.body[1].y = snake.body[0].y + 50
  // snakeLocationY = snakeLocationY + snakeSpeedY

  // snake.body[1].x = snake.body[0].x
  // snake.body[1].y = snake.body[0].y

  

  // loop through each body part
  // console.log(snake.body[0].x)
  // for (let i = 0; snake.body.length; i++) {
  // console.log(snake.body[i])
  //  console.log(snake.body[0].x);   
  //  console.log(snake.body[0].y);   
  // }
  // console.log(snakeLocationX)

  // move the current body part to where it's parent was
}


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
  // debugger;
  // renderRect(snakeLocationX, snakeLocationY, snakeSizeX, snakeSizeY, 'blue')
  renderRect(snake.body[0].x, snake.body[0].y, snakeSizeX, snakeSizeY, 'blue')

  renderRect(snake.body[1].x, snake.body[1].y, snakeSizeX, snakeSizeY, 'blue')

  // renderRect(snake.body[2].x, snake.body[2].y, snakeSizeX, snakeSizeY, 'blue')
  // Apple
  // renderRect(appleLocationX, appleLocationY, appleSizeX, appleSizeY, 'red')
  // draw tale
  // renderRect(snakeLocationX + snake.body[1].x, snakeLocationY + snake.body[1].y, snakeSizeX, snakeSizeY, 'blue')
  // renderRect(snakeLocationX + snake.body[2].x, snakeLocationY + snake.body[2].y, snakeSizeX, snakeSizeY, 'blue')
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
      snakeSpeedX = 1;
      snakeSpeedY = 0;
      // taleSizeX = taleSizeX + 20
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
  }
  if (e.which === 37) {
    // console.log('left click')
    if (isMoveRightLeft) {
      snakeSpeedX = -1;
      snakeSpeedY = 0;
      // taleSizeX = taleSizeX + 20
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
    // snakeLocationX = snakeLocationX - snakeSizeX
  }
  if (e.which === 38) {
    // console.log('up click')
    if (isMoveDownUp) {
      snakeSpeedY = -1;
      snakeSpeedX = 0;
      // taleSizeX = taleSizeX - 20
    }
    isMoveDownUp = false
    isMoveRightLeft = true;
    // snakeLocationY = snakeLocationY - snakeSizeY
  }
  if (e.which === 40) {
    // console.log('down click')
    if (isMoveDownUp) {
      snakeSpeedY = 1;
      snakeSpeedX = 0;
      // taleSizeX = taleSizeX - 20
    }
    isMoveDownUp = false
    isMoveRightLeft = true;
    // snakeLocationY = snakeLocationY + snakeSizeY
  }
})


