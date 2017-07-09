class Ghost {
  constructor(s, x, y, type, cornerX, cornerY) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.s = s;
    this.path;
    this.cornerX = cornerX;
    this.cornerY = cornerY;
    this.direction = [1, 0];
    this.moving = false;
    this.begin = true;
    this.speed = 0.1;
    this.DIMENSION = 17;
    this.hit = false;
    this.powerMode = false;
  }

  draw(frameCount) {

    switch(this.type) {
      case "INKY":
        this.s.image(this.powerMode ? this.s.powerGhostImage : this.s.inkyImage, this.x * this.DIMENSION, this.y * this.DIMENSION, this.DIMENSION, this.DIMENSION)
        break;
      case "PINKY":
        this.s.image(this.powerMode ? this.s.powerGhostImage : this.s.pinkyImage, this.x * this.DIMENSION, this.y * this.DIMENSION, this.DIMENSION, this.DIMENSION)
        break;
      case "BLINKY":
        this.s.image(this.powerMode ? this.s.powerGhostImage : this.s.blinkyImage, this.x * this.DIMENSION, this.y * this.DIMENSION, this.DIMENSION, this.DIMENSION)
        break;
      case "CLYDE":
        this.s.image(this.powerMode ? this.s.powerGhostImage : this.s.clydeImage, this.x * this.DIMENSION, this.y * this.DIMENSION, this.DIMENSION, this.DIMENSION)
        break;
    }
  }

  move(pacX, pacY, grid, time, powerMode) {
    let possibleDirections = [[1, 0], [0, -1], [-1, 0], [0, 1]]
      if ([1, -1].includes(this.direction[0])) {
      possibleDirections = [[0, -1], [0, 1]]
    } else if ([1, -1].includes(this.direction[1])) {
      possibleDirections = [[1, 0], [-1, 0]]
    }
    let newDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
    let dirSum = 10000;

    let goToX = time > 8 ? pacX : this.cornerX;
    let goToY = time > 8 ? pacY : this.cornerY;

    if(!this.powerMode) {
      possibleDirections.forEach(dir => {
        let posSum;
        posSum = Math.sqrt((this.x + dir[0] - goToX)**2 + (this.y + dir[1] - goToY)**2)
        if(posSum < dirSum && this.moving !== false) {
          dirSum = posSum;
          newDirection = dir;
        }
      });
    }
    if ((this.x <= pacX + .15 && this.x >= pacX - .15) && (this.y <= pacY + .15 && this.y >= pacY - .15 )) {
      this.hit = true;
    }
    if (this.x % 1 === 0 && this.y % 1 === 0){
      let target = grid[this.x + this.y * 28 + newDirection[0] + newDirection[1] * 28]
      let oldTarget = grid[this.x + this.y * 28 + this.direction[0] + this.direction[1] * 28]

      if(target && target.type !== "WALL") {
        this.direction = newDirection
      } else if (target && target.type === "WALL" && oldTarget.type !== "WALL") {
        this.direction
      } else if(target && target.type === "WALL") {
        this.direction = [0, 0];
        this.moving = false;
        this.path = 'stop';
      }

    }

    if (this.direction[0] === 1) {
      this.path = 'right'
      this.x = this.x + this.speed;
      this.moving = true;
    } else if (this.direction[0] === -1){
      this.path = 'left'
      this.x = this.x - this.speed;
      this.moving = true;
    } else if(this.direction[1] === 1) {
      this.y = this.y + this.speed;
      this.moving = true;
      this.path = 'up'
    } else if(this.direction[1] === -1) {
      this.y = this.y - this.speed;
      this.moving = true;
      this.path = 'down'
    }
    this.x = Math.round(this.x * 10) / 10
    this.y = Math.round(this.y * 10) / 10
    return this;
  }


}

export default Ghost;
