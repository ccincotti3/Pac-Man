import Tile from './tile';
import gridMap from './grid_map';
import Pacman from './pacman';
import Ghost from './ghost';
export default function sketch(s) {
  let grid = []
  let DIMENSION = 25;
  let gridText;
  let pacman;
  let inky;
  let clyde;
  let pinky;
  let blinky;
  let pacDx = 0;
  let pacDy = 0;
  let time = 0;

  s.preload = () => {
    gridText = gridMap()
  }
  s.setup = () => {
    s.createCanvas(525, 525);
    grid = createGrid();
    s.inkyImage = s.loadImage('./assets/Inky.png');
    s.blinkyImage = s.loadImage('./assets/blinky.png');
    s.pinkyImage = s.loadImage('./assets/pinky.png');
    s.clydeImage = s.loadImage('./assets/clyde.png');
  }

  s.draw = () => {
    s.background(51);
    time =  ((s.millis() / 1000) % 20)

    pacman = pacman.movePacman(pacDx, pacDy, grid);
    inky = inky.move(pacman.x, pacman.y, grid, time);
    pinky = pinky.move(pacman.x, pacman.y, grid, time);
    blinky = blinky.move(pacman.x, pacman.y, grid, time);
    clyde = clyde.move(pacman.x, pacman.y, grid, time);

    let thisTile = grid[pacman.x + pacman.y * 21];
    if(thisTile && thisTile.type === "PELLET") {
      thisTile.type = "OPEN"
    }

    for (let i = 0; i < grid.length; i++) {
      grid[i].draw(s.frameCount % 8);
    }
  }

  s.keyPressed = () => {
    if(s.keyCode === s.RIGHT_ARROW) {
      [pacDx, pacDy] = [1, 0]
    } else if(s.keyCode === s.LEFT_ARROW) {
      [pacDx, pacDy] = [-1, 0]
    } else if(s.keyCode === s.DOWN_ARROW) {
      [pacDx, pacDy] = [0, 1]
    } else if(s.keyCode === s.UP_ARROW) {
      [pacDx, pacDy] = [0, -1]
    }
  }

  const createGrid = () => {
    for (let i = 0; i < gridText.length; i++) {
      let row = gridText[i][0].split(" ");
      for (let j = 0; j < row.length; j++) {
        let type = Tile.parseType(row[j])
        if(type === "PACMAN") {
          grid.push(new Pacman(s, j, i, type))
          pacman = grid[grid.length - 1]
        } else if (["BLINKY", "PINKY", "INKY", "CLYDE"].includes(type)) {
          switch (type) {
            case "BLINKY":
              grid.push(new Ghost(s, j, i, type, 0, 0))
              blinky = grid[grid.length - 1]
              break;
            case "PINKY":
              grid.push(new Ghost(s, j, i, type, 0, 441))
              pinky = grid[grid.length - 1]
              break;
            case "INKY":
              grid.push(new Ghost(s, j, i, type, 441, 441))
              inky = grid[grid.length - 1]
              break;
            case "CLYDE":
              grid.push(new Ghost(s, j, i, type, 441, 0))
              clyde = grid[grid.length - 1]
              break;
          }
        } else {
          grid.push(new Tile(s, j, i, type))
        }
      }
    }
    return grid
  }


}
