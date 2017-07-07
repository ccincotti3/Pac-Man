import Tile from './tile';
import gridMap from './grid_map';
import Pacman from './pacman';
export default function sketch(s) {
  let grid = []
  let DIMENSION = 25;
  let gridText;
  let canvas;
  let pacman;
  let pacmanDirection = 'stop';

  s.preload = () => {
    gridText = gridMap()
  }
  s.setup = () => {
    s.createCanvas(525, 525);
    grid = createGrid();
  }

  s.draw = () => {
    s.background(51);
    pacman = pacman.movePacman(pacmanDirection, grid);
    for (let i = 0; i < grid.length; i++) {
      grid[i].draw(s.frameCount % 8);
    }
  }

  s.keyPressed = () => {
    if(s.keyCode === s.RIGHT_ARROW) {
      pacmanDirection = 'right'
    } else if(s.keyCode === s.LEFT_ARROW) {
      pacmanDirection = 'left'
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
        } else {
          grid.push(new Tile(s, j, i, type))
        }
      }
    }
    return grid
  }


}
