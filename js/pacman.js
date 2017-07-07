class Pacman {
  constructor(s, x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.s = s;


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

  movePacman(direction, grid) {
    if(grid[Math.ceil(this.x) + this.y * 21].type === "WALL") {
      return this;
    }
    if (direction === 'right') {
      this.x = this.x + this.speed;
    } else if (direction === 'left'){
      this.x = this.x - this.speed;
    } else if(direction === 'up') {
      this.y = this.y + this.speed;
    } else if(direction === 'down') {
      this.y = this.y - this.speed
    }
    return this;
  }
}

export default Pacman
