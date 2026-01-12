const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const GameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");

const heighscoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const blockHeight = 50;
const blockWidth = 50;

let heighscore = localStorage.getItem("heighScore") || 0;
let score = 0;
let time = "00-00";

heighscoreElement.innerText = heighscore;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervalID = null;

let timerIntervelID = null;

let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
const blocks = [];
let snake = [{ x: 1, y: 3 }];
let directions = "down";

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row}-${col}`;
    blocks[`${row}-${col}`] = block;
  }
}

function update() {
  let head = null;

  if (directions === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (directions === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (directions === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (directions === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  // * Wall Collosion Logic
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    // alert("Game Over");
    clearInterval(intervalID);

    modal.style.display = "flex";
    startGameModal.style.display = "none";
    GameOverModal.style.display = "flex";

    return;
  }

  // * Food COnsumption Logic
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };

    score += 10;
    scoreElement.innerText = score;

    if (score > heighscore) {
      heighscore = score;
      localStorage.setItem("heighScore", heighscore.toString());
    }
  } else {
    snake.pop();
  }

  snake.unshift(head);

  render();
}

function render() {
  // Clear the board
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      blocks[`${row}-${col}`].classList.remove("fill", "food");
    }
  }

  // Draw the food
  blocks[`${food.x}-${food.y}`].classList.add("food");

  // Draw the snake
  snake.forEach((segment) => {
    if (blocks[`${segment.x}-${segment.y}`]) {
      blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    }
  });
}

//

startButton.addEventListener(
  "click",
  () => {
    modal.style.display = "none";
    intervalID = setInterval(() => {
      update();
    }, 300);
    timerIntervelID = setInterval(() => {
      let [min, sec] = time.split("-").map(Number);

      if (sec == 59) {
        min += 1;
        sec = 0;
      } else {
        sec += 1;
      }

      time = `${min.toString().padStart(2, "0")}-${sec.toString().padStart(2, "0")}`;
      timeElement.innerText = time;
    }, 1000);
  }
  // 300
);

restartButton.addEventListener("click", restartGame);

function restartGame() {
  score = 0;
  time = "00-00";

  scoreElement.innerText = score;
  timeElement.innerText = time;
  heighscoreElement.innerText = heighscore;

  modal.style.display = "none";
  directions = "down";

  snake = [{ x: 1, y: 3 }];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };

  intervalID = setInterval(() => {
    update();
  }, 300);
}

function timerFunc() {}

addEventListener("keydown", (event) => {
  console.log("Key pressed:", event.key);
  switch (event.key) {
    case "ArrowUp":
      if (directions !== "down") {
        directions = "up";
      }
      break;
    case "ArrowDown":
      if (directions !== "up") {
        directions = "down";
      }
      break;
    case "ArrowLeft":
      if (directions !== "right") {
        directions = "left";
      }
      break;
    case "ArrowRight":
      if (directions !== "left") {
        directions = "right";
      }
      break;
  }
});

// render();
