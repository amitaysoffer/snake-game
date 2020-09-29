let mines = [];

let isMines = false;
function toggleMinesActivation() {
  if (!isMines) {
    document.getElementsByClassName('btn-mine')[0].innerHTML = `<i
    class="fas fa-bomb"></i> Remove Mines <i class='fas fa-bomb'></i>`
    document.getElementsByClassName('btn-mine')[0].classList.add('blue-border')
    isMines = true
  } else {
    document.getElementsByClassName('btn-mine')[0].innerHTML = `<i
    class="fas fa-bomb"></i> Add Mines <i class='fas fa-bomb'></i>`
    document.getElementsByClassName('btn-mine')[0].classList.remove('blue-border')
    isMines = false
  }
}

function addMine() {
  mineLocationX = Math.floor((Math.random() * canvas.width) + 1);
  mineLocationY = Math.floor((Math.random() * canvas.height) + 1);

  // Verify mine doesn't render out of canvas
  mineLocationX = mineLocationX > canvas.width - snakeSizeX ? canvas.width - snakeSizeX : mineLocationX
  mineLocationY = mineLocationY > canvas.height - snakeSizeY ? canvas.height - snakeSizeY : mineLocationY

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
