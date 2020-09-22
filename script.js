window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  drawEverything();
  setInterval(function () {
    moveSnake();
    drawEverything();
  }, 10);
};

let canvas;
let canvasContext;

let snakeSizeX = 10;
let snakeSizeY = 10;


let body = [
  { x: 40, y: 100 },
  { x: 20, y: 100 },
  { x: 0, y: 100 }
]

let bodyCopy = [
  { x: 40, y: 100 },
  { x: 20, y: 100 },
  { x: 0, y: 100 }
]



let directionX = 20;
let directionY = 0;



function loop() {

  for (let i = 1; body.length > i; i++) {
    // debugger
    body[i].x = bodyCopy[i - 1].x
    body[i].y = bodyCopy[i - 1].y
  }

  for (let j = 0; bodyCopy.length > j; j++) {
    bodyCopy[j].x = body[j].x
    bodyCopy[j].y = body[j].y
  }
}

function moveSnake() {
  // debugger
  // bodyCopy = body;

  body[0].x += directionX;
  body[0].y += directionY;

  loop();
  // console.log(body[0].x)
  // console.log(body[0].y)

}

function drawEverything() {
  renderRect(0, 0, canvas.width, canvas.height, "black");

  renderRect(body[0].x, body[0].y, snakeSizeX, snakeSizeY, "blue");
  renderRect(body[1].x, body[1].y, snakeSizeX, snakeSizeY, "blue");
  renderRect(body[2].x, body[2].y, snakeSizeX, snakeSizeY, "blue");
}

function renderRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}


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
  }
  if (e.which === 37) {
    // left
    if (isMoveRightLeft) {
      directionY = 0;
      directionX = -20;
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
  }
  if (e.which === 38) {
    // up
    if (isMoveDownUp) {
      directionY = -20;
      directionX = 0;
    }
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
    isMoveDownUp = false
    isMoveRightLeft = true;
  }
})