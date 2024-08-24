let game = document.querySelector(".game");
let character = document.querySelector(".character");
const box = character.getBoundingClientRect();
let PositionTop = box.top;
let PositionLeft = box.left;
let upInterval;
let gravityTimeout
let gravityInterval;
const speed = 25;
const gravity = 25;
const gravityPeriod =1000;
let Yvalue = 25;
let isapplied =false;

//checking the direction
window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    clearAll();
    up();
  } else if (e.code === "ArrowLeft") {
    clearAll();
    left();
  } else if (e.code === "ArrowRight") {
    clearAll();
    right();
  }
});

//moving the character
function up() {
  if (PositionTop >= 0 && !isapplied) {
      clearTimeout(gravityTimeout)
      gravityTimeout=setTimeout(() => {
        clearAll()
        applyGravity();
      },gravityPeriod);
      
      console.log("starting the interval")
      upInterval = setInterval(() => {
        PositionTop -= 5;
        if (isOut()) {
          clearAll();
        }
        character.style.top = `${PositionTop}px`;
      }, speed);
    }

}
// Moving the character left
function left() {
  
  //applying the gravity
  clearInterval(gravityInterval)
  clearTimeout(gravityTimeout)
  gravityTimeout=setTimeout(() => {
    clearAll()
    clearInterval(gravityInterval)
    applyGravity();
  },gravityPeriod-700);


  PositionLeft -= Yvalue;
  if (isXout()) {
    PositionLeft = 0; // Reset to 0 if out of bounds
  }
  character.style.left = `${PositionLeft}px`;
}

// Moving the character right
function right() {
  //applying the gravity
  clearTimeout(gravityTimeout)
  clearInterval(gravityInterval)
  gravityTimeout=setTimeout(() => {
    clearAll()
    applyGravity();
  },gravityPeriod-700);


  PositionLeft += Yvalue;
  if (isXout()) {
    PositionLeft = window.innerWidth - box.width; // Reset to right boundary if out of bounds
  }
  character.style.left = `${PositionLeft}px`;
}

//applying the gravity on jump
function applyGravity() {
  isapplied=true
  console.log("Applying gravity...");

  if(isapplied){//checking if the gravity should be applied
    gravityInterval = setInterval(() => {
      PositionTop += 5; // Apply gravity
      character.style.top = `${PositionTop}px`;
  
      if (isOut()) {
        isapplied=false
        clearAll()
      }
    }, gravity); // Faster interval for smoother gravity
  
  }
}

//checks if horizantally out
function isXout(){
  return (
    PositionLeft <= 0 ||
    PositionLeft + box.width >= window.innerWidth
  );
}

//clearing the intervals
function clearAll() {
  clearInterval(upInterval); // Clear the up interval
  clearInterval(gravityInterval); // Clear the gravity interval
  isapplied = false; // Reset the flag to allow future intervals
}
//checks if the character is out of the container
function isOut() {
  return (
    PositionTop <= 0 ||
    PositionTop + box.height >= window.innerHeight ||
    PositionLeft <= 0 ||
    PositionLeft + box.width >= window.innerWidth
  );
}