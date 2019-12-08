const FRAMES = 15;

const canvas = document.getElementById("snakeCanvas");
const context = canvas.getContext("2d");

const snake = [
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 1, y: 3 },
  { x: 1, y: 4 }
];
let apple = { x: 9, y: 15 };

context.scale(10, 10);

let directions = { x: 1, y: 0 };

const updateLoop = () => {
  const tail = snake.pop();
  const head = snake[0];

  tail.x = head.x + directions.x;
  tail.y = head.y + directions.y;

  snake.unshift(tail);

  if (head.x === apple.x && head.y === apple.y) {
    apple = { x: 0, y: 0 };
  }

  draw();
};

const draw = () => {
  context.fillStyle = "black";
  context.clearRect(0, 0, 320, 320);

  snake.forEach(({ x, y }) => {
    context.fillRect(x, y, 1, 1);
  });

  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, 1, 1);
};

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
