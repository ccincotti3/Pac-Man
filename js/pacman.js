class Pacman {
  constructor(s, x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.s = s;
    this.direction = [0, 0];
    this.moving = false;

    this.speed = 0.2;
    this.DIMENSION = 25;
  }

  draw(frameCount) {
    this.s.noStroke();
    this.s.fill('#FFFF00');
      if (frameCount <= 4) {
        this.s.arc(
          this.x * this.DIMENSION + 3,
          this.y * this.DIMENSION + 3,
          20, 20, (.25  - .0625 * frameCount) * this.s.PI,
          (1.75 + (.0625 * frameCount)) * this.s.PI,
          this.s.PIE
        );
      } else {
        this.s.arc(
          this.x * this.DIMENSION + 3,
          this.y * this.DIMENSION + 3,
          20, 20, (.0625 * (frameCount % 4)) * this.s.PI,
          (2 - (.0625 * (frameCount % 4))) * this.s.PI,
          this.s.PIE
        );
      }
  }

  movePacman(dx, dy, grid) {
    let newDirection = [dx, dy];

    let target = grid[this.x + this.y * 21 + dx + dy * 21]
    let oldTarget = grid[this.x + this.y * 21 + this.direction[0] + this.direction[1] * 21]
    if(target && target.type !== "WALL") {
      this.direction = newDirection
    } else if (target && target.type === "WALL" && oldTarget.type !== "WALL") {
      this.direction
    } else if(target && target.type === "WALL") {
      this.direction = [0, 0];
      this.moving = false;
    }

    if (this.direction[0] === 1) {
      this.x = this.x + this.speed;
          this.moving = true;
    } else if (this.direction[0] === -1){
      this.x = this.x - this.speed;
          this.moving = true;
    } else if(this.direction[1] === 1) {
      this.y = this.y + this.speed;
          this.moving = true;
    } else if(this.direction[1] === -1) {
      this.y = this.y - this.speed;
          this.moving = true;
    }
    this.x = Math.round(this.x * 10) / 10
    this.y = Math.round(this.y * 10) / 10
    return this;
  }
}

export default Pacman
