document.addEventListener("DOMContentLoaded", () => {
  let stairs = [];
  const game = document.querySelector(".game");
  const character = document.querySelector(".character");
  const gameBody = game.getBoundingClientRect(); // Get dimensions of the game container
  const box = character.getBoundingClientRect(); // Get dimensions of the character

  // Initialize relative positions
  let PositionTop = box.top - gameBody.top;
  let PositionLeft = box.left - gameBody.left;

  const Yspeed = 5; // Speed of vertical movement
  const Xspeed = 50; // Speed of horizontal movement
  let gravityInterval;
  let gravitySpeed = 3;
  let delay;
  const delaySpeed = 200;
  let stairNumber =100;
  let upInterval
  
  
  // Initial setup
  createStair();

  // Checking the direction
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      moveStair();
    }

    if (e.code === "ArrowUp") {
      moveUp();
    } else if (e.code === "ArrowLeft") {
      moveLeft();
    } else if (e.code === "ArrowRight") {
      moveRight();
    }
  });

  // Moving the character up
  function moveUp() {
    clearInterval(gravityInterval);
    clearTimeout(delay);
    clearInterval(upInterval)

    upInterval=setInterval(()=>{
      PositionTop -=Yspeed; // Updating the up position
      if (isOut()) {
        clearInterval(upInterval)
        PositionTop = Math.max(PositionTop, 0); // Prevent moving above the game area
      }
      updateCharacterPosition();

    //adding the gravity after some delay
    delay = setTimeout(() => {
      clearInterval(upInterval)
      gravity();
    }, delaySpeed);

  },gravitySpeed)

  }

  // Moving the character left
  function moveLeft() {
    clearInterval(gravityInterval);

    PositionLeft -= Xspeed;
    if (isOut()) {
      PositionLeft = Math.max(PositionLeft, 0); // Prevent moving outside the game area
    }
    updateCharacterPosition();
    delay = setTimeout(() => {
      gravity();
    }, delaySpeed);
  }

  // Moving the character right
  function moveRight() {
    clearInterval(gravityInterval);

    PositionLeft += Xspeed;
    if (isOut()) {
      PositionLeft = Math.min(PositionLeft, gameBody.width - box.width); // Prevent moving outside the game area
    }
    updateCharacterPosition();
    delay = setTimeout(() => {
      gravity();
    }, delaySpeed);
  }

  // Collision detection between the stair and the character
  function checkCollision() {
    let box = character.getBoundingClientRect();

    stairs.forEach((stair) => {
      let box2 = stair.getBoundingClientRect();

      if (
box.top + box.height >= box2.top &&
box.top <=box2.top &&
box.left + box.width >=box2.left &&
box.left <= box2.left + box2.width
      ) {

        moveUp();
      }
    });
  }

  
  // Creating the platform or stair
  function createStair() {
    for (let i = 0; i < stairNumber; i++) {
      // Creating the element
      let newStair = document.createElement("div");
      newStair.classList.add("stair");
      game.appendChild(newStair);

      // Adding the position of the stair
      let stairBottom = 120 + i * 100;
      let stairLeft = 30 + Math.floor(Math.random() * 200);

      newStair.style.bottom = `${stairBottom}px`;
      newStair.style.left = `${stairLeft}px`;

      // Adding to the stairs array
      stairs.push(newStair);
    }
    stairNumber += 5;
  }

  //moving the stair downwards
  function moveStair() {
    let stairInterval
    clearInterval(stairInterval)

    stairs.forEach((stair) => {
      let boxTop = stair.getBoundingClientRect().top;
  
      // Create a unique interval for each stair
    setInterval(() => {
        boxTop += 5;
        checkStair()
        stair.style.top = `${boxTop}px`;
      }, 30);
    })
  }
  // Check if a stair has moved below the game body height
function checkStair() {
  stairs.forEach((stair) => {
    let boxTop = stair.getBoundingClientRect().top;
    if (boxTop >= gameBody.height) {
      stairs.shift(); // Remove the first stair
       stair.remove()
      }
  });

}

  // Updates the character's position
  function updateCharacterPosition() {
    character.style.top = `${PositionTop}px`;
    character.style.left = `${PositionLeft}px`;
  }

  // Checks if the character is out of the container
  function isOut() {
    return (
      PositionTop < 0 ||
      PositionTop + box.height > gameBody.height ||
      PositionLeft < 0 ||
      PositionLeft + box.width > gameBody.width
    );
  }

  // Adding gravity
  function gravity() {
    if (gravityInterval) {
      clearInterval(gravityInterval);
    }

    gravityInterval = setInterval(() => {
      PositionTop += 2;
      checkCollision();

      if (PositionTop + box.height > gameBody.height) {
        PositionTop = gameBody.height - box.height;
        clearInterval(gravityInterval);
        gravityInterval = null;
      }
      updateCharacterPosition();
    }, gravitySpeed);
  }
});
