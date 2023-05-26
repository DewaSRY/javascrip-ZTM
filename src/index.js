const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse,
  Body,
  Events,
} = Matter;
const cells = 200;
const cellsHorizontal = 10;
const cellsVertical = 5;
const height = 600;
const width = 800;
const uniteLength = width / cellsHorizontal;
const uniteHeight = height / cellsVertical;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: width,
    height: height,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);
// Wals;
const walls = [
  Bodies.rectangle(width / 2, 0, width, 5, {
    isStatic: true,
  }),
  Bodies.rectangle(width / 2, height, width, 5, {
    isStatic: true,
  }),
  Bodies.rectangle(0, height / 2, 5, height, {
    isStatic: true,
  }),
  Bodies.rectangle(width, height / 2, 5, height, {
    isStatic: true,
  }),
];
World.add(world, walls);
//Maze generator
const shuffle = (arr) => {
  let counter = arr.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};
const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));
const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);
const stepThroughCell = (row, column) => {
  // if i have visited the cell at [row,column],then return
  if (grid[row][column]) return;
  //Mark this cell as being visited
  grid[row][column] = true;
  // Assemble randomly-ordered list of neigbors
  const neigbors = shuffle([
    [row - 1, column, "up"],
    [row, column + 1, "right"],
    [row + 1, column, "down"],
    [row, column - 1, "left"],
  ]);
  // console.log(neigbors);

  //for each neighbor...
  for (let neigbor of neigbors) {
    const [nextRow, nextColumn, direction] = neigbor;
    // see if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorizontal
    )
      continue;
    //if we have visited that neighbor, continue to neighbor
    if (grid[nextRow][nextColumn]) continue;
    //remove a wall from either horizontals or verticals
    if (direction === "left") {
      verticals[row][column - 1] = true;
    } else if (direction === "right") {
      verticals[row][column] = true;
    } else if (direction === "up") {
      horizontals[row - 1][column] = true;
    } else if (direction === "down") {
      horizontals[row][column] = true;
    }
    stepThroughCell(nextRow, nextColumn);
  }
  //visited the cell
};
stepThroughCell(startRow, startColumn);
// console.log(grid);
horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open === true) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * uniteLength + uniteLength / 2,
      rowIndex * uniteLength + uniteLength,
      uniteLength,
      10,
      {
        isStatic: true,
        label: "wall",
      }
    );
    World.add(world, wall);
  });
});
verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open === true) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * uniteLength + uniteLength,
      rowIndex * uniteLength + uniteLength / 2,
      10,
      uniteHeight,
      {
        label: "wall",
        isStatic: true,
      }
    );
    World.add(world, wall);
  });
});
const goal = Bodies.rectangle(
  width - uniteHeight / 2,
  height - uniteLength / 2,
  uniteLength * 0.5,
  uniteHeight * 0.5,
  {
    isStatic: true,
    label: "goal",
  }
);
World.add(world, goal);
//Ball
const ballRadius = Math.min(uniteLength, uniteHeight) * 0.3;
const ball = Bodies.circle(uniteLength / 2, uniteHeight / 2, ballRadius, {
  label: "ball",
});
World.add(world, ball);
document.addEventListener("keydown", (event) => {
  const { x, y } = ball.velocity;
  if (event.code === "KeyW") {
    Body.setVelocity(ball, {
      x,
      y: y - 5,
    });
  } else if (event.code === "KeyS") {
    Body.setVelocity(ball, {
      x,
      y: y + 5,
    });
  } else if (event.code === "KeyA") {
    Body.setVelocity(ball, {
      x: x - 5,
      y,
    });
  } else if (event.code === "KeyD") {
    Body.setVelocity(ball, {
      x: x + 5,
      y,
    });
  }
});
//Win Conditions
Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    const labels = ["ball", "goal"];
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      world.gravity.y = 1;
      world.bodies.forEach((body) => {
        if (body.label === "wall") {
          Body.setStatic(body, false);
        }
      });
      setTimeout(() => {
        stepThroughCell(startRow, startColumn);
      }, 2000);
    }
  });
});
