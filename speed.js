const speeds = {
  slow: 110,
  medium: 70,
  insane: 45
}
let levelSpeed;
const renderModal = function () {
  document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      levelSpeed = speeds[e.target.id]
      document.getElementById('modal-instructions').remove()
      gameStart(levelSpeed);
      drawEverything();
    })
  })
  document.getElementById("modal-instructions").style.display = "block";
}
renderModal()