window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  appleReset();
  drawEverything();
  setInterval(function () {
    moveSnake();
    drawEverything();
  }, 30);
};

let canvas;
let canvasContext;

let snakeSizeX = 5;
let snakeSizeY = 5;


let body = [
  { x: 20, y: 100 },
  { x: 10, y: 100 },
  { x: 0, y: 100 }
]

let bodyCopy = [
  { x: 20, y: 100 },
  { x: 10, y: 100 },
  { x: 0, y: 100 }
]

let directionX = 10;
let directionY = 0;

function loop() {
  for (let i = 1; body.length > i; i++) {
    // Attach snake to head
    body[i].x = bodyCopy[i - 1].x
    body[i].y = bodyCopy[i - 1].y

    // Copy the original settings to the bodyCopy
    bodyCopy[i - 1].x = body[i - 1].x
    bodyCopy[i - 1].y = body[i - 1].y

  }
}

function moveSnake() {
  // debugger
  body[0].x += directionX;
  body[0].y += directionY;

  loop();

  // keeps snake inside the game borders
  if (body[0].x < 0) {
    directionX = -directionX
  }
  if (body[0].x > canvas.width - snakeSizeX) {
    directionX = -directionX
  }
  if (body[0].y < 0) {
    directionY = -directionY
  }
  if (body[0].y > canvas.height - snakeSizeY) {
    directionY = -directionY
  }

  // Hit the apple
  if (body[0].x + snakeSizeX >= appleLocationX && body[0].x <= appleLocationX + appleSizeX &&
    body[0].y + snakeSizeY >= appleLocationY && body[0].y <= appleLocationY + appleSizeY) {
    appleReset();

    // debugger;

    // Add a body part to the snake
    if (body[0].x != body[1].x) {
      body.push({ x: body[body.length - 1].x - (body[0].x - body[1].x), y: body[0].y });

      bodyCopy.push({ x: bodyCopy[bodyCopy.length - 1].x - (bodyCopy[0].x - bodyCopy[1].x), y: bodyCopy[0].y });
      console.log(body.length)
      console.log(bodyCopy.length)
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

    console.log('I hit the apple!')
    // debugger
  }
}


// Apple settings
let appleLocationX;
let appleLocationY;
let appleSizeX = 30;
let appleSizeY = 30;

function renderSnake() {
  for (let k = 0; body.length > k; k++) {
    renderRect(body[k].x, body[k].y, snakeSizeX, snakeSizeY, "blue");
  }
  // debugger
}

function drawEverything() {
  // Canvas
  renderRect(0, 0, canvas.width, canvas.height, "black");

  // Snake
  renderSnake();
  // renderRect(body[0].x, body[0].y, snakeSizeX, snakeSizeY, "blue");
  // renderRect(body[1].x, body[1].y, snakeSizeX, snakeSizeY, "blue");
  // renderRect(body[2].x, body[2].y, snakeSizeX, snakeSizeY, "blue");

  // Apple
  renderRect(appleLocationX, appleLocationY, appleSizeX, appleSizeY, 'red')
}
function renderRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function appleReset() {
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
      directionX = 10;
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
  }
  if (e.which === 37) {
    // left
    if (isMoveRightLeft) {
      directionY = 0;
      directionX = -10;
    }
    isMoveRightLeft = false;
    isMoveDownUp = true
  }
  if (e.which === 38) {
    // up
    if (isMoveDownUp) {
      directionY = -10;
      directionX = 0;
    }
    isMoveDownUp = false
    isMoveRightLeft = true;
  }
  if (e.which === 40) {
    // down
    if (isMoveDownUp) {
      // debugger;
      directionY = 10;
      directionX = 0;
    }
    isMoveDownUp = false
    isMoveRightLeft = true;
  }
})