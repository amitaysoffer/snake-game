const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const span = document.querySelectorAll('span');
// Snake game settings
const appleSizeX = 20;
const appleSizeY = 20;
const snakeSizeX = 20;
const snakeSizeY = 20;
let appleLocationX;
let appleLocationY;
let mineLocationX;
let mineLocationY;
// Push arrow to start game
let isMoveSnakeStart = false
// Control arrows
let isMoveUp = true
let isMoveDown = true
let isMoveRight = false
let isMoveLeft = false
// Snake directions
let directionX = 20;
let directionY = 0;
// Current Score
let score = 0
// Local Storage
let currentHighScore = !localStorage.getItem('highest-score') ? 0 :
  localStorage.getItem('highest-score');
span[0].innerText = currentHighScore
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
// Sound
let mySound;
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
}

function gameStart() {
  appleReset();
  runGame = setInterval(function () {
    if (isMoveSnakeStart) {
      moveSnakeHead();
      moveSnakeBody();
      drawEverything();
      headCollidesBody();
      headCollidesApple();
      headCollidesMine()
      isBorders ? removeBorders() : addBorders();
    }
  }, 50);
}
gameStart();
drawEverything();

function moveSnakeHead() {
  body[0].x += directionX;
  body[0].y += directionY;
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

function headCollidesApple() {
  if (body[0].x === appleLocationX && body[0].y === appleLocationY) {
    appleReset();
    addTaleToBody();
    addSound('./sounds/apple.mp3');
    span[1].innerHTML++
    score++
    if (isMines) {
      addMine();
    }
  }
}

function headCollidesMine() {
  for (let i = 0; mines.length > i; i++) {
    if (body[0].x === mines[i].mineLocationX && body[0].y === mines[i].mineLocationY) {
      addSound('./sounds/explosion.mp3');
      gameOver('A Mine!')
    }
  }
}

function headCollidesBody() {
  for (let i = 1; body.length > i; i++) {
    if (body[0].x === body[i].x && body[0].y === body[i].y) {
      addSound('./sounds/borders.mp3');
      gameOver('Body');
    }
  }
}

function drawEverything() {
  // Canvas
  renderRect(0, 0, canvas.width, canvas.height, "black");
  // Snake
  renderRect(body[0].x, body[0].y, snakeSizeX, snakeSizeY, 'yellow');
  for (let k = 1; body.length > k; k++) {
    renderRect(body[k].x, body[k].y, snakeSizeX, snakeSizeY, 'green');
  }
  // Apple
  renderRect(appleLocationX, appleLocationY, appleSizeX, appleSizeY, 'red')
  // Mines
  for (let i = 0; mines.length > i; i++) {
    renderRect(mines[i].mineLocationX, mines[i].mineLocationY, appleSizeX, appleSizeY, 'white')
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

let isGameOn = true;
function gameOver(location) {
  clearInterval(runGame);
  setLocalStorage()
  displayGameOverScreen(location);
  addSound('./sounds/cheering.mp3');

  isGameOn = false;
  document.body.onkeyup = function (e) {
    if (e.which == 32) {
      if (!isGameOn) {
        modal.style.display = "none";
        resetAllSettings()
        gameStart();
        drawEverything();

        mySound.stop();
        isGameOn = true
      }
    }
  }
}

const modal = document.getElementById("myModal");
function displayGameOverScreen(location) {
  // Block rest of screen
  modal.style.display = "block";
  // Append new score details
  const div = document.createElement('div');
  // Remove old score if exists on display
  if (document.getElementsByClassName('modal-header')[0].childElementCount > 1
  ) {
    document.getElementsByClassName('modal-header')[0].lastElementChild.remove()
  }
  div.innerHTML = `
  <h3>Apples collected: ${score}</h3>
  <h3>Highest score: ${currentHighScore}</h3>
  <h3>Collision: ${location}</h3>
  `
  document.getElementsByClassName('modal-header')[0].appendChild(div);
}

function setLocalStorage() {
  if (currentHighScore < score) {
    localStorage.setItem('highest-score', score);
    currentHighScore = localStorage.getItem('highest-score');
    span[0].innerText = currentHighScore
  }
}

function addSound(newSound) {
  mySound = new sound(newSound);
  mySound.play();
}

function resetAllSettings() {
  isMoveUp = false
  isMoveDown = false
  isMoveRight = false
  isMoveLeft = false

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
  span[1].innerHTML = '0'

  isMoveUp = true
  isMoveDown = true
  isMoveRight = false
  isMoveLeft = false
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
    document.body.style.width = '1100px'
  } else if (size === 'medium') {
    canvas.width = 800
    canvas.height = 600
    document.body.style.width = '800px'
  } else if (size === 'small') {
    canvas.width = 600
    canvas.height = 400
    document.body.style.width = '600px'
  } else if (size === 'petite') {
    canvas.width = 300
    canvas.height = 500
    document.body.style.width = '400px'
    document.getElementsByClassName('row')[0].classList.add('flex-flow');
  }
  sizeElement.classList.add('red-color');
  appleReset();
  drawEverything();
}

// Control Snake with arrows
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