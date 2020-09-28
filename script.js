const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const appleSizeX = 20;
const appleSizeY = 20;
const snakeSizeX = 20;
const snakeSizeY = 20;

let appleLocationX;
let appleLocationY;
let isMoveSnakeStart = false

let isMoveUp = true
let isMoveDown = true
let isMoveRight = false
let isMoveLeft = false

let directionX = 20;
let directionY = 0;

let score = 0
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

let mineLocationX;
let mineLocationY;
let mines = [];

function addMine() {
  mineLocationX = Math.floor((Math.random() * canvas.width) + 1);
  mineLocationY = Math.floor((Math.random() * canvas.height) + 1);

  // Verify mine doesn't render out of canvas
  mineLocationX = mineLocationX > 780 ? 780 : mineLocationX
  mineLocationY = mineLocationY > 580 ? 580 : mineLocationY

  // Verify is in the grid system
  while (mineLocationY / 20 % 1) {
    mineLocationY = mineLocationY + 1
  }
  while (mineLocationX / 20 % 1) {
    mineLocationX = mineLocationX + 1
  }

    // Verify mine doesn't render on the snake
    for (let i = 0; body.length > i; i++) {
      for (let k = 0; body.length > k; k++) {
        if (mineLocationX === body[i].x && mineLocationY === body[k].y) {
          console.log('mine touched Snake when renders')
          appleReset();
        }
      }
    }
  }
  

appleReset();
drawEverything();
function gameStart() {
  runGame = setInterval(function () {
    if (isMoveSnakeStart) {
      moveSnakeHead();
    }
    drawEverything();
  }, 50);
}
gameStart();
 
function moveSnakeHead() {
  body[0].x += directionX;
  body[0].y += directionY;

  moveSnakeBody();
  snakeHeadTouchesBody();
  // If snake head touches apple
  if (body[0].x === appleLocationX && body[0].y === appleLocationY) {
    appleReset();
    addTaleToBody();

    document.querySelector('span').innerHTML++
    score++
  }

  isBorders ? removeBorders() : addBorders();
  // isMines ? removeBorders() : addBorders();
}

function moveSnakeBody() {
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

function snakeHeadTouchesBody() {
  for (let i = 1; body.length > i; i++) {
    if (body[0].x === body[i].x && body[0].y === body[i].y) {
      gameOver('Snake head touched body!');
    }
  }
}


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

  // Verify apple doesn't render out of canvas
  appleLocationX = appleLocationX > 780 ? 780 : appleLocationX
  appleLocationY = appleLocationY > 580 ? 580 : appleLocationY

  // Verify is in the grid system
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

function addBorders() {
  if (body[0].y >= 0 && body[0].y <= canvas.height && body[0].x == -snakeSizeX) {
    // Left side
    gameOver('Snake touched the left border!');
  }
  else if (body[0].x >= 0 && body[0].x <= canvas.width && body[0].y == -snakeSizeY) {
    // Top side
    gameOver('Snake touched the top border!');
  } else if (body[0].x == canvas.width && body[0].y >= 0 &&
    body[0].y <= canvas.height) {
    // Right side
    gameOver('Snake touched the right border!');
  }
  else if (body[0].x >= 0 && body[0].x <= canvas.width && body[0].y == canvas.height) {
    // Bottom side
    gameOver('Snake touched the bottom border!');
  }
}


function gameOver(message) {
  clearInterval(runGame);
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
  // debugger

  const h3 = document.createElement('h3');
  if (document.getElementsByClassName('modal-header')[0].childElementCount > 1
  ) {
    document.getElementsByClassName('modal-header')[0].lastElementChild.remove()
  }
  const failedMessage = document.createTextNode(message);
  h3.appendChild(failedMessage);
  document.getElementsByClassName('modal-header')[0].appendChild(h3);


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

// Activate/Deactivate borders button
let isMines = false;
function toggleMinesActivation() {
  // debugger
  if (!isMines) {
    console.log('mines ON')
    isMines = true
  } else {
    console.log('mines OFF')
    isMines = false
  }
}

// Activate/Deactivate mines button
let isBorders = false;
function toggleBordersActivation() {
  // debugger
  if (!isBorders) {
    document.getElementById('canvas').style.border = '10px solid black';
    document.getElementsByClassName('button')[0].innerText = 'Deactivate Sidelines'
    isBorders = true
  } else {
    document.getElementById('canvas').style.border = '1px solid black';
    document.getElementsByClassName('button')[0].innerText = 'Activate Sidelines'
    isBorders = false
  }
}

function addTaleToBody() {
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

function removeBorders() {
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


// Moving the snake with arrows 
document.addEventListener("keydown", function (e) {
  if (e.which === 39) {
    if (isMoveRight) {
      directionX = 20;
      directionY = 0;
    }
    isMoveRight = false;
    isMoveLeft = false;
    isMoveUp = true;
    isMoveDown = true;
    isMoveSnakeStart = true
  }
  if (e.which === 37) {
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
    if (isMoveDown) {
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