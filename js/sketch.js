import Tile from './tile'
import gridMap from './grid_map'
export default function sketch(s) {
  let grid = []
  let DIMENSION = 25;
  let gridText;
  s.preload = () => {
    gridText = gridMap()
  }
  s.setup = () => {
    s.createCanvas(500, 500);
    grid = createGrid();
  }

  s.draw = () => {
    s.background(51);
    for (let i = 0; i < grid.length; i++) {
      grid[i].draw();
    }
  }

  createGrid = () => {
    for (let i = 0; i < gridText.length; i++) {
      row = gridText[i].split(" ")
      for (let j = 0; j < row.length; j++) {
        let type = Tile.parseType()
          grid.push(new Tile(s, i, j, type))
      }

    }
  }
}
