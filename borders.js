let isBorders = false;
function toggleBordersActivation() {
  if (!isBorders) {
    document.getElementById('canvas').style.border = '15px solid blue';
    document.getElementsByClassName('btn-border')[0].innerHTML = `<i class='fas fa-crop-alt'></i> Remove Borders <i class='fas fa-crop-alt'></i>`
    document.getElementsByClassName('btn-border')[0].classList.add('blue-border')
    isBorders = true
  } else {
    document.getElementById('canvas').style.border = 'none';
    document.getElementsByClassName('btn-border')[0].innerHTML = `<i class='fas fa-crop-alt'></i> Add Borders <i class="fas fa-crop-alt"></i>`
    document.getElementsByClassName('btn-border')[0].classList.remove('blue-border')
    isBorders = false
  }
}

function addBorders() {
  if (body[0].y >= 0 && body[0].y <= canvas.height && body[0].x == -snakeSizeX) {
    // Left side
    gameOver('Left border');
  }
  else if (body[0].x >= 0 && body[0].x <= canvas.width && body[0].y == -snakeSizeY) {
    // Top side
    gameOver('Top border');
  } else if (body[0].x == canvas.width && body[0].y >= 0 &&
    body[0].y <= canvas.height) {
    // Right side
    gameOver('Right border');
  }
  else if (body[0].x >= 0 && body[0].x <= canvas.width && body[0].y == canvas.height) {
    // Bottom side
    gameOver('Bottom border');
  }
}

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
