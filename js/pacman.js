class Pacman {
  constructor(s, x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.s = s;
    this.direction = [1, 0];
    this.moving = false;
    this.pacTopLip = .25;
    this.pacBottomLip = 1.75;
    this.speed = 0.2;
    this.DIMENSION = 17;
  }

  draw(frameCount) {
    let pacBottomLip;
    let pacTopLip;

    if (this.direction[0] === 1) {
      pacBottomLip = 1.75;
      pacTopLip = .25
    } else if (this.direction[0] === -1) {
      pacBottomLip = .70
      pacTopLip = 1.25
    }
    this.s.noStroke();
    this.s.fill('#FFFF00');
      if (frameCount <= 4) {
        this.s.arc(
          this.x * this.DIMENSION + 2,
          this.y * this.DIMENSION + 2,
          14, 14, (this.pacTopLip  - .0625 * frameCount) * this.s.PI,
          (this.pacBottomLip + (.0625 * frameCount)) * this.s.PI,
          this.s.PIE
        );
      } else {
        this.s.arc(
          this.x * this.DIMENSION + 2,
          this.y * this.DIMENSION + 2,
          14, 14, ((this.pacTopLip - .25) + .0625 * (frameCount % 4)) * this.s.PI,
          ((this.pacBottomLip + .25) - (.0625 * (frameCount % 4))) * this.s.PI,
          this.s.PIE
        );
      }

    // right - .25 -> 0, 1.75 -> 2
    // left - .75 -> 1, 1.25 -> 1
  }

  movePacman(dx, dy, grid) {
    let newDirection = [dx, dy];

    let target = grid[this.x + this.y * 28 + dx + dy * 28]
    let oldTarget = grid[this.x + this.y * 28 + this.direction[0] + this.direction[1] * 28]
    if(target && target.type !== "WALL" && target.type !== "GATE") {
      this.direction = newDirection
    } else if (target && (target.type === "WALL" || target.type === "GATE") && (oldTarget.type !== "WALL" && oldTarget.type !== "GATE")) {
      this.direction
    } else if(target && (target.type === "WALL"  || target.type === "GATE")) {
      this.direction = [0, 0];
      this.moving = false;
    }

    if (this.direction[0] === 1) {
      this.x = this.x + this.speed;
      console.log(this.y)
      if (this.x === 27 && this.y === 14) {
        this.x = 0;
      }
      this.moving = true;
      this.pacBottomLip = 1.75;
      this.pacTopLip = .25
    } else if (this.direction[0] === -1){
      this.pacBottomLip = .70
      this.pacTopLip = 1.25
      this.x = this.x - this.speed;
      if (this.x === 0 && this.y === 14) {
        this.x = 27;
      }
      this.moving = true;
    } else if(this.direction[1] === 1) {
      this.pacBottomLip = .25
      this.pacTopLip = .75
      this.y = this.y + this.speed;
      this.moving = true;
    } else if(this.direction[1] === -1) {
      this.pacBottomLip = 1.20
      this.pacTopLip = 1.75
      this.y = this.y - this.speed;
      this.moving = true;
    }
    this.x = Math.round(this.x * 10) / 10
    this.y = Math.round(this.y * 10) / 10
    return this;
  }
}

export default Pacman
