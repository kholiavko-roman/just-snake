const BG_COLOR = "#50713c";
const COLOR = "#0b1010";
const FRAMES = 5;
const SIZE = 6;

const canvas = document.getElementById("snakeCanvas");
const context = canvas.getContext("2d");

canvas.width = 134;
canvas.height = 94;

const canvasMaxWidth = Math.floor(canvas.width / SIZE);
const canvasMaxHeight = Math.floor(canvas.height / SIZE);

const snake = [
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 1, y: 3 },
  { x: 1, y: 4 }
];
let apple = generateRandomFood();
let directions = { x: 1, y: 0 };

const updateLoop = () => {
  const tail = snake.pop();
  const head = snake[0];

  tail.x = head.x + directions.x;
  tail.y = head.y + directions.y;

  snake.unshift(tail);

  if (head.x === apple.x && head.y === apple.y) {
    snake.push({ ...apple });
    apple = generateRandomFood();
  }

  const newHead = snake[0];

  for (let i = 1; i < snake.length; i++) {
    const cell = snake[i];
    if (cell.x === newHead.x && cell.y === newHead.y) {
      console.log("Your are die 😥");
    }
  }

  draw();
};

const draw = () => {
  context.fillStyle = BG_COLOR;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = COLOR;

  snake.forEach(({ x, y }) => {
    context.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
  });

  context.fillRect(apple.x * SIZE, apple.y * SIZE, SIZE, SIZE);
};

function generateRandomFood() {
  return {
    x: Math.floor(Math.random() * canvasMaxWidth),
    y: Math.floor(Math.random() * canvasMaxHeight)
  };
}

const handleKeyup = event => {
  switch (event.key) {
    case "ArrowUp": {
      directions = { x: 0, y: -1 };
      break;
    }

    case "ArrowRight": {
      directions = { x: 1, y: 0 };
      break;
    }

    case "ArrowDown": {
      directions = { x: 0, y: 1 };
      break;
    }

    case "ArrowLeft": {
      directions = { x: -1, y: 0 };
      break;
    }
  }
};

document.body.addEventListener("keyup", handleKeyup);

setInterval(() => {
  requestAnimationFrame(updateLoop);
}, 1000 / FRAMES);
