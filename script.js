const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const appleSizeX = 20;
const appleSizeY = 20;
const snakeSizeX = 20;
const snakeSizeY = 20;

let appleLocationX;
let appleLocationY;
let mineLocationX;
let mineLocationY;
let mines = [];

let isMoveSnakeStart = false

let isMoveUp = true
let isMoveDown = true
let isMoveRight = false
let isMoveLeft = false

let directionX = 20;
let directionY = 0;

let score = 0

let currentHighScore = !localStorage.getItem('highest-score') ? 0 :
  localStorage.getItem('highest-score');

// Set LS
document.querySelectorAll('span')[0].innerText = currentHighScore

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
        appleReset();
      }
    }
  }
  mines.push({
    mineLocationX: mineLocationX,
    mineLocationY: mineLocationY,
  })
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
    // debugger
    document.querySelectorAll('span')[1].innerHTML++
    score++
    // add mines
    if (isMines) {
      addMine();
    }
  }

  for (let i = 0; mines.length > i; i++) {
    if (body[0].x === mines[i].mineLocationX && body[0].y === mines[i].mineLocationY) {
      gameOver('mine')
    }
  }
  isBorders ? removeBorders() : addBorders();
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
      gameOver('Body');
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
  // Mines
  for (let i = 0; mines.length > i; i++) {
    renderRect(mines[i].mineLocationX, mines[i].mineLocationY, appleSizeX, appleSizeY, 'black')
  }
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
        appleReset();
      }
    }
  }
}

function addBorders() {
  if (body[0].y >= 0 && body[0].y <= canvas.height && body[0].x == -snakeSizeX) {
    // Left side
    gameOver('Left');
  }
  else if (body[0].x >= 0 && body[0].x <= canvas.width && body[0].y == -snakeSizeY) {
    // Top side
    gameOver('Top');
  } else if (body[0].x == canvas.width && body[0].y >= 0 &&
    body[0].y <= canvas.height) {
    // Right side
    gameOver('Right');
  }
  else if (body[0].x >= 0 && body[0].x <= canvas.width && body[0].y == canvas.height) {
    // Bottom side
    gameOver('Bottom');
  }
}

function gameOver(location) {
  clearInterval(runGame);
  const modal = document.getElementById("myModal");
  modal.style.display = "block";

  // Set Local Storage
  if (currentHighScore < score) {
    localStorage.setItem('highest-score', score);
    currentHighScore = localStorage.getItem('highest-score');
    document.querySelectorAll('span')[0].innerText = currentHighScore
  }

  const div = document.createElement('div');
  if (document.getElementsByClassName('modal-header')[0].childElementCount > 1
  ) {
    document.getElementsByClassName('modal-header')[0].lastElementChild.remove()
  }

  div.innerHTML = `
    <h3>Place of collision: ${location}</h3>
    <h3>Number of apples: ${score}</h3>
    <h3>Highest score: ${currentHighScore}</h3>
  `
  document.getElementsByClassName('modal-header')[0].appendChild(div);

  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {

      isMoveUp = false
      isMoveDown = false
      isMoveRight = false
      isMoveLeft = false

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

      mines = []
      score = 0;
      isMoveSnakeStart = false
      document.querySelectorAll('span')[1].innerHTML = '0'

      isMoveUp = true
      isMoveDown = true
      isMoveRight = false
      isMoveLeft = false

      gameStart();
      appleReset();

      e.preventDefault();
    }
  }
}

// Activate/Deactivate mines button
let isMines = false;
function toggleMinesActivation() {
  // debugger
  if (!isMines) {
    document.getElementsByClassName('btn-mine')[0].innerHTML = `<i
    class="fas fa-bomb"></i> Deactivate Mines <i class='fas fa-bomb'></i>`
    document.getElementsByClassName('btn-mine')[0].classList.add('red-border')
    isMines = true
  } else {
    document.getElementsByClassName('btn-mine')[0].innerHTML = `<i
    class="fas fa-bomb"></i> Activate Mines <i class='fas fa-bomb'></i>`
    document.getElementsByClassName('btn-mine')[0].classList.remove('red-border')
    isMines = false
  }
}

// Activate/Deactivate Sidelines button
let isBorders = false;
function toggleBordersActivation() {
  // debugger
  if (!isBorders) {
    document.getElementById('canvas').style.border = '10px solid black';
    document.getElementsByClassName('btn-border')[0].innerHTML = `<i class='fas fa-crop-alt'></i> Deactivate Sidelines <i class='fas fa-crop-alt'></i>`
    document.getElementsByClassName('btn-border')[0].classList.add('red-border')
    isBorders = true
  } else {
    document.getElementById('canvas').style.border = '2px solid black';
    document.getElementsByClassName('btn-border')[0].innerHTML = `<i class='fas fa-crop-alt'></i> Activate Sidelines <i class="fas fa-crop-alt"></i>`
    document.getElementsByClassName('btn-border')[0].classList.remove('red-border')
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

function changeCanvasSize(size) {
  const sizeElement = document.getElementById(size);
  for (let i = 0; 4 > i; i++) {
    document.getElementsByClassName('size')[i].classList.remove('red-color');
  }
  document.getElementsByClassName('row')[0].classList.remove('flex-flow');
  if (size === 'big') {
    canvas.width = 1100
    canvas.height = 700
    sizeElement.classList.add('red-color');
    document.body.style.width = '1100px'
    appleReset();
  } else if (size === 'medium') {
    canvas.width = 800
    canvas.height = 600
    sizeElement.classList.add('red-color');
    document.body.style.width = '800px'
    appleReset();
  } else if (size === 'small') {
    canvas.width = 600
    canvas.height = 400
    sizeElement.classList.add('red-color');
    document.body.style.width = '600px'
    appleReset();
  } else if (size === 'petite') {
    canvas.width = 300
    canvas.height = 500
    sizeElement.classList.add('red-color');
    document.body.style.width = '400px'
    document.getElementsByClassName('row')[0].classList.add('flex-flow');
    appleReset();
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