let isBorders = false;
function toggleBordersActivation() {
  if (!isBorders) {
    document.getElementById('canvas').classList.add('gameBorder');
    document.getElementsByClassName('btn-border')[0].innerHTML = `<i class='fas fa-crop-alt'></i> Remove Borders <i class='fas fa-crop-alt'></i>`
    document.getElementsByClassName('btn-border')[0].classList.add('blue-border')
    isBorders = true
  } else {
    document.getElementById('canvas').classList.remove('gameBorder');
    document.getElementsByClassName('btn-border')[0].innerHTML = `<i class='fas fa-crop-alt'></i> Add Borders <i class="fas fa-crop-alt"></i>`
    document.getElementsByClassName('btn-border')[0].classList.remove('blue-border')
    isBorders = false
  }
}

function headCollidesBorder() {
  if (body[0].y >= 0 && body[0].y <= canvas.height && body[0].x == -snakeSizeX) {
    // Left side
    addSound('./sounds/borders.mp3');
    gameOver('Left border');
  }
  else if (body[0].x >= 0 && body[0].x <= canvas.width && body[0].y == -snakeSizeY) {
    // Top side
    addSound('./sounds/borders.mp3');
    gameOver('Top border');
  } else if (body[0].x == canvas.width && body[0].y >= 0 &&
    body[0].y <= canvas.height) {
    // Right side
    addSound('./sounds/borders.mp3');
    gameOver('Right border');
  }
  else if (body[0].x >= 0 && body[0].x <= canvas.width && body[0].y == canvas.height) {
    // Bottom side
    addSound('./sounds/borders.mp3');
    gameOver('Bottom border');
  }
}

function addBorders() {
  if (body[0].y >= snakeSizeY && body[0].y <= canvas.height &&
    body[0].x >= 0 && body[0].x < snakeSizeX) {
    // Left side
    direction = DIRECTION_UP
    isMoveUp = false
    isMoveDown = false
    isMoveRight = true
    isMoveLeft = false
  }
  else if (body[0].x >= 0 && body[0].x < canvas.width - snakeSizeX
    && body[0].y >= 0 && body[0].y < snakeSizeY) {
    // Top side   
    direction = DIRECTION_RIGHT
    isMoveUp = false
    isMoveDown = true
    isMoveRight = false
    isMoveLeft = false
  } else if (body[0].x >= canvas.width - snakeSizeX && body[0].y >= 0 && body[0].y < canvas.height - snakeSizeY) {
    // Right side
    direction = DIRECTION_DOWN
    isMoveUp = false
    isMoveDown = false
    isMoveRight = false
    isMoveLeft = true
  }
  else if (body[0].x <= canvas.width - snakeSizeX && body[0].x >= 0
    && body[0].y >= canvas.height - snakeSizeY && body[0].y <= canvas.height) {
    // Bottom side
    direction = DIRECTION_LEFT
    isMoveUp = true
    isMoveDown = false
    isMoveRight = false
    isMoveLeft = false
  }
}