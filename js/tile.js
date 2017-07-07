
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
      case "POWER":
        this.s.ellipseMode(this.s.CORNER);
        this.s.noStroke();
        this.s.fill('#FFFF00');
        this.s.ellipse(this.x * this.DIMENSION + this.DIMENSION / 4,
                        this.y * this.DIMENSION + this.DIMENSION / 4,
                        this.DIMENSION / 2);

      default:
        this.s.stroke(0);
        break;
    }
  }

  static parseType(numType) {
    switch (numType) {
      case "0":
        return "WALL"
        break;
      case "1":
        return "PELLET"
        break;
      case "2":
        return "PACMAN"
        break;
      case "3":
        return "INKY"
        break;
      case "4":
        return "BLINKY"
        break;
      case "5":
        return "PINKY"
        break;
      case "6":
        return "CLYDE"
        break;
      case "7":
        return "OPEN"
        break;
      case "8":
        return "POWER"
        break;
      default:
        return "DEFAULT"
    }
  }
}


export default Tile;
