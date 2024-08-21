let game = document.querySelector(".game");
let character = document.querySelector(".character");
let upInterval;
let downInterval;
let leftInterval;
let rightInterval;
let speed=25
    
//checking the direction
window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    clearAll();
    up();
  } else if (e.code === "ArrowDown") {
    clearAll();
    down();
  } else if (e.code === "ArrowLeft") {
    clearAll();
    left();
  } else if (e.code === "ArrowRight") {
    clearAll();
    right();
  }
});
//clearing the intervals
function clearAll() {
  clearInterval(upInterval);
  clearInterval(downInterval);
  clearInterval(leftInterval);
  clearInterval(rightInterval);
}

//moving the character
function up() {
  let direction = character.getBoundingClientRect();
  let Position = direction.top;

  if (Position >= 0) {
    upInterval = setInterval(() => {
      Position -= 5;
      if (Position <= 0) {
        clearAll();
      }
      character.style.top = `${Position}px`;
    }, speed);
  }
}
function down() {
  let direction = character.getBoundingClientRect();
  let Position = direction.top;
  downInterval = setInterval(() => {
    Position += 5;
    if (Position + direction.height >= window.innerHeight) {
      clearAll();
    }
    character.style.top = `${Position}px`;
  }, speed);
}
function left() {
  let direction = character.getBoundingClientRect();
  let Position = direction.left;
  upInterval = setInterval(() => {
    Position -= 5;
    if (Position <= 0) {
        clearAll();
      }
    character.style.left = `${Position}px`;
  }, speed);
}
function right() {
  let direction = character.getBoundingClientRect();
  let Position = direction.left;
  upInterval = setInterval(() => {
    Position += 5;
    if (Position + direction.width >= window.innerWidth) {
      clearAll();
    }
    character.style.left = `${Position}px`;
  }, speed);
}
