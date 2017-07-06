import Tile from './tile'
export default function sketch(s) {
  let grid = []
  let DIMENSION = 25;
  s.setup = () => {
    s.createCanvas(500, 500);
    for (var i = 0; i < 400; i++) {
      grid.push(new Tile(s, i % 20, Math.floor(i / 20), "PELLET"))
    }
  }

  s.draw = () => {
    s.background(51);
    for (var i = 0; i < grid.length; i++) {
      grid[i].draw();
    }
  }
}
