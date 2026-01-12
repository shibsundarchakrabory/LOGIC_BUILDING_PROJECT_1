const board = document.querySelector(".board");
const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervalID = null;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
const blocks = [];
const snake = [{ x: 1, y: 3 }];
let directions = "down";

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    block.innerText = `${row}-${col}`;
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

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    alert("Game Over");
    clearInterval(intervalID);
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
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

intervalID = setInterval(() => {
  update();
}, 300);

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

render();
