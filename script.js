// object to store all info needed for update
const state = {
  player1Pos: 40,
  player2Pos: 40,
  ballPos: { x: 47, y: 45 },
  ballSpeed: { x: -0.1, y: 0.1 },
  player1Score: 0,
  player2Score: 0,
};

//  player controls
function handleInput(event) {
  // Player 1 controls (W and S keys)
  if (event.key === "w") {
    if (state.player1Pos != 1) {
      state.player1Pos -= 3;
    }
  } else if (event.key === "s") {
    if (state.player1Pos != 82) {
      state.player1Pos += 3;
    }
  }

  // Player 2 controls (ArrowUp and ArrowDown keys)
  if (event.key === "ArrowUp") {
    if (state.player2Pos != 1) {
      state.player2Pos -= 3;
    }
  } else if (event.key === "ArrowDown") {
    if (state.player2Pos != 82) {
      state.player2Pos += 3;
    }
  }
}
// ball movement, collision and score updates
function moveBall() {
  // Ball movement
  state.ballPos.x += state.ballSpeed.x;
  state.ballPos.y += state.ballSpeed.y;

  // Check for collisions with walls and paddles
  if (state.ballPos.y <= 0 || state.ballPos.y >= 95) {
    // Reverse the y-direction if the ball hits the top or bottom wall
    state.ballSpeed.y *= -1;
  }

  // Check for collisions with paddles
  if (
    (state.ballPos.x <= 5 &&
      state.ballPos.y >= state.player1Pos &&
      state.ballPos.y <= state.player1Pos + 20) ||
    (state.ballPos.x >= 95 &&
      state.ballPos.y >= state.player2Pos &&
      state.ballPos.y <= state.player2Pos + 20)
  ) {
    // Reverse the x-direction if the ball hits a paddle
    state.ballSpeed.x *= -1;
  }

  // Update player scores if ball goes out of bounds
  if (state.ballPos.x <= 0) {
    state.player2Score++;
    resetBall();
  } else if (state.ballPos.x >= 100) {
    state.player1Score++;
    resetBall();
  }
}

function resetBall() {
  // Reset the ball position and speed
  state.ballPos = { x: 47, y: 45 };
}

function updateGame() {
  //  Update ball position based on ballSpeed
  moveBall();

  // Check for collisions with walls and paddles
  // Update player scores if ball goes out of bounds

  // Update the DOM based on the new state
  document.getElementById("P1").style.top = `${state.player1Pos}%`;
  document.getElementById("P2").style.top = `${state.player2Pos}%`;
  document.getElementById("ball").style.left = `${state.ballPos.x}%`;
  document.getElementById("ball").style.top = `${state.ballPos.y}%`;

  // update ball postion

  // Update scores
}

// Function to start the game loop
function startGame() {
  // Add event listener for keydown to handle player input
  document.addEventListener("keydown", handleInput);

  // Start the game loop
  function gameLoop() {
    updateGame(); // Update game state and DOM
    requestAnimationFrame(gameLoop); // Repeat the loop
  }

  gameLoop(); // Start the game loop
}

window.onload = startGame;
