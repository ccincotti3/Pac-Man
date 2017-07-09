import Tile from './tile';
import gridMap from './grid_map';
import Pacman from './pacman';
import Ghost from './ghost';
export default function sketch(s) {
  let grid = []
  let DIMENSION = 17;
  let gridText;
  let pacman;
  let inky;
  let clyde;
  let pinky;
  let blinky;
  let pacDx = 0;
  let pacDy = 0;
  let time = 0;
  let score = 0;
  let powerMode = false;
  let powerStartTime = 0;
  let hitter;
  let canvasX = 476;
  let canvasY = 600;
  let lives = 3;
  let characterIndex = [];
  let newGame = true;
  let pause = false;
  let start = true;
  let won = false;
  let pellets = 0

  s.preload = () => {
    s.inkyImage = s.loadImage('./assets/Inky.png');
    s.blinkyImage = s.loadImage('./assets/blinky.png');
    s.pinkyImage = s.loadImage('./assets/pinky.png');
    s.clydeImage = s.loadImage('./assets/clyde.png');
    s.powerGhostImage = s.loadImage('./assets/powerghost.png');
    s.liveImage = s.loadImage('./assets/pacman_live.png');
    s.myFont = s.loadFont('assets/joystix monospace.ttf');

  }
  s.setup = () => {
    lives = 3;
    score = 0;
    time = 0;
    powerStartTime = 0;
    characterIndex = [];
    newGame = true;
    pause = false;
    start = true;
    won = false;
    pellets = 0
    powerMode = false;

    grid = []
    s.createCanvas(canvasX, canvasY);
    gridText = gridMap();
    grid = createGrid();
    s.textFont(s.myFont);
    s.textSize(48);
    s.reset();


  }

  s.reset = () => {
    resetObjects();
  };

  s.draw = () => {
    gameWon();
    if (start) {
      s.background(51);
      for (let i = 0; i < grid.length; i++) {
        grid[i].draw();
      }
      s.fill('#FFFF00');
      s.text(`PRESS ENTER`, canvasX / 2, 250);
      s.text(`TO PLAY`, canvasX / 2, 300);
      s.textAlign(s.CENTER)
    } else if(pause) {
      s.text(`PAUSE`, canvasX / 2, 250);
    } else if(won) {
      s.text(`YOU WIN!`, canvasX / 2, 250);
      s.text(`PRESS 'N'`, canvasX / 2, 300);
      s.text(`FOR A`, canvasX / 2, 350);
      s.text(`NEW GAME!`, canvasX / 2, 400);
    } else {
      playGame();
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
    } else if (s.keyCode === s.ENTER) {
      start = false;
    }
  }

  s.keyTyped = () => {
    if(s.key === 'p') {
      pause = !pause;
    } else if(s.key === 'n') {
      s.setup();
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
          pacman.startingX = j;
          pacman.startingY = i;
          characterIndex.push(grid.length - 1)
        } else if (["BLINKY", "PINKY", "INKY", "CLYDE"].includes(type)) {
          switch (type) {
            case "BLINKY":
              grid.push(new Ghost(s, j, i, type, 0, 0))
              blinky = grid[grid.length - 1]
              blinky.startingPoint = grid.length - 1;
              blinky.startingX = j;
              blinky.startingY = i;
              characterIndex.push(blinky.startingPoint)
              break;
            case "PINKY":
              grid.push(new Ghost(s, j, i, type, 0, 400))
              pinky = grid[grid.length - 1]
              pinky.startingPoint = grid.length - 1;
              pinky.startingX = j;
              pinky.startingY = i;
              characterIndex.push(pinky.startingPoint)
              break;
            case "INKY":
              grid.push(new Ghost(s, j, i, type, 400, 400))
              inky = grid[grid.length - 1]
              inky.startingPoint = grid.length - 1
              inky.startingX = j;
              inky.startingY = i;
              characterIndex.push(inky.startingPoint)
              break;
            case "CLYDE":
              grid.push(new Ghost(s, j, i, type, 400, 0))
              clyde = grid[grid.length - 1]
              clyde.startingPoint = grid.length - 1;
              clyde.startingX = j;
              clyde.startingY = i;
              characterIndex.push(clyde.startingPoint)
              break;
          }
        } else if( type === "PELLET" || type === "POWER") {
          grid.push(new Tile(s, j, i, type))
          pellets++;
        } else {
          grid.push(new Tile(s, j, i, type))
        }
      }
    }
    return grid
  }

  const checkHit = (...args) => {
    let hitter;
    args.forEach(ghost => {
      if(ghost.hit) {
        hitter = ghost;
      }
    });

    return hitter;
  }
  const resetObjects = () => {
    [blinky, pinky, clyde, inky, pacman].forEach(char => {
      char.x = char.startingX;
      char.y = char.startingY;
    })
  }

  const flipPower = (bool, ...args) => {
    powerMode = bool
    args.forEach(ghost => {
      ghost.powerMode = bool
    })
  }

  const playGame =() => {
    s.background(51);
    time = s.millis() / 1000
    if (time - powerStartTime > 12) {
      flipPower(false, inky, pinky, blinky, clyde)
    }
    pacman = pacman.movePacman(pacDx, pacDy, grid);

    inky = inky.move(pacman.x, pacman.y, grid, time % 20, powerMode);
    pinky = pinky.move(pacman.x, pacman.y, grid, time % 20, powerMode);
    blinky = blinky.move(pacman.x, pacman.y, grid, time % 20, powerMode);
    clyde = clyde.move(pacman.x, pacman.y, grid, time % 20, powerMode);

    let thisTile = grid[pacman.x + pacman.y * 28];
    if(thisTile && thisTile.type === "PELLET") {
      thisTile.type = "OPEN";
      score += 100;
      pellets--;
      console.log(pellets)
    } else if(thisTile && thisTile.type === "POWER") {
      thisTile.type = "OPEN";
      pellets--;
      flipPower(true, inky, pinky, blinky, clyde)
      powerStartTime = s.millis() / 1000
    }

    hitter = checkHit(inky, blinky, pinky, clyde);
    if (powerMode && hitter && hitter.powerMode) {
      hitter.x = hitter.startingX;
      hitter.y = hitter.startingY;
      hitter.powerMode = false;
      hitter.hit = false
      hitter = null;
    } else if (hitter) {
      hitter.hit = false
      hitter = null;
      flipPower(false, inky, blinky, pinky, clyde);
      lives--;
      s.reset();
    }

    for (let i = 0; i < grid.length; i++) {
      if (!characterIndex.includes(i)) {
        grid[i].draw();
      }
    }

    //draw characters last

    for (var i = 0; i < characterIndex.length; i++) {
      grid[characterIndex[i]].draw(s.frameCount % 8, powerMode)
    }

    s.text(`${score}`, 100, 580);
    for (var i = 0; i < lives; i++) {
      s.image(s.liveImage, (i * 40) + 350, 550, 30, 30)
    }

  }

  const gameWon = () => {
    if (pellets === 0) {
      won = true;
    }
  }
}
