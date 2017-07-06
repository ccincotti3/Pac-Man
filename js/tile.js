
class Tile {
  constructor(s, x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.s = s;

    this.DIMENSION = 25;
  }

  draw() {
    switch (this.type) {
      case "WALL":
        this.s.stroke(0);
        this.s.fill('#0000FF');
        this.s.rect(this.x * this.DIMENSION,
                    this.y * this.DIMENSION,
                    this.DIMENSION,
                    this.DIMENSION
                  );
        break;
      case "PELLET":
        this.s.ellipseMode(this.s.CORNER);
        this.s.noStroke();
        this.s.fill(255);
        this.s.ellipse(this.x * this.DIMENSION + this.DIMENSION / 3,
                        this.y * this.DIMENSION + this.DIMENSION / 3,
                        this.DIMENSION / 3);
        break;
      case "OPEN":
        this.s.fill(255);
        this.s.noStroke();
        break;
      default:
        this.s.stroke(0);
        break;
    }
  }
}


export default Tile;
