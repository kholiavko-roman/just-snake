const FRAMES = 10;

const canvas = document.getElementById('snakeCanvas');
const context = canvas.getContext('2d');
const snake = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 3],
  [1, 4],
];

context.scale(10, 10);

let directions = [1, 0];

document.body.addEventListener('keyup', (event) => {
  console.log(event);

  switch (event.key) {
    case 'ArrowUp': {
      directions = [0, -1];
      break;
    }

    case 'ArrowRight': {
      directions = [1, 0];
      break;
    }

    case 'ArrowDown': {
      directions = [0, 1];
      break;
    }


    case 'ArrowLeft': {
      directions = [-1, 0];
      break;
    }

  }
});

const updateLoop = () => {
  const tail = snake.pop();
  const head = snake[0];

  tail[0] = head[0] + directions[0];
  tail[1] = head[1] + directions[1];

  snake.unshift(tail);

  draw();

};

const draw = () => {
  context.clearRect(0, 0, 320, 320);

  snake.forEach(([x, y]) => {
    context.fillRect(x, y, 1, 1);
  });
};

setInterval(() => {
  requestAnimationFrame(updateLoop);
}, 1000 /FRAMES);

