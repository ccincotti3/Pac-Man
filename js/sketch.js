import Tile from './tile';
import gridMap from './grid_map';
import Pacman from './pacman';
import Ghost from './ghost';
export default function sketch(s) {
  let grid = []
  let DIMENSION = 25;
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
  let canvasX = 525;
  let canvasY = 600;
  let lives = 3;
  let characterIndex = [];
  let newGame = true;
  let pause = false;
  let start = true;

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

    if (pause) {
      s.text(`PAUSE`, 265, 250);
    } else if(start) {
      s.background(51);
      for (let i = 0; i < grid.length; i++) {
        grid[i].draw();
      }
      s.fill('#FFFF00');
      s.text(`PRESS ENTER`, 260, 250);
      s.text(`TO PLAY`, 260, 300);
      s.textAlign(s.CENTER)

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
              grid.push(new Ghost(s, j, i, type, 0, 441))
              pinky = grid[grid.length - 1]
              pinky.startingPoint = grid.length - 1;
              pinky.startingX = j;
              pinky.startingY = i;
              characterIndex.push(pinky.startingPoint)
              break;
            case "INKY":
              grid.push(new Ghost(s, j, i, type, 441, 441))
              inky = grid[grid.length - 1]
              inky.startingPoint = grid.length - 1
              inky.startingX = j;
              inky.startingY = i;
              characterIndex.push(inky.startingPoint)
              break;
            case "CLYDE":
              grid.push(new Ghost(s, j, i, type, 441, 0))
              clyde = grid[grid.length - 1]
              clyde.startingPoint = grid.length - 1;
              clyde.startingX = j;
              clyde.startingY = i;
              characterIndex.push(clyde.startingPoint)
              break;
          }
        } else if ( newGame === true ){
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

  const playGame =() => {
    s.background(51);
    time = s.millis() / 1000
    if (time - powerStartTime > 12) {
      powerMode = false;
    }
    pacman = pacman.movePacman(pacDx, pacDy, grid);

    inky = inky.move(pacman.x, pacman.y, grid, time % 20);
    pinky = pinky.move(pacman.x, pacman.y, grid, time % 20);
    blinky = blinky.move(pacman.x, pacman.y, grid, time % 20);
    clyde = clyde.move(pacman.x, pacman.y, grid, time % 20);

    let thisTile = grid[pacman.x + pacman.y * 21];
    if(thisTile && thisTile.type === "PELLET") {
      thisTile.type = "OPEN";
      score += 100;
    } else if(thisTile && thisTile.type === "POWER") {
      thisTile.type = "OPEN";
      powerMode = true;
      powerStartTime = s.millis() / 1000
    }

    hitter = checkHit(inky, blinky, pinky, clyde);
    if (powerMode && hitter) {
      hitter.x = 11
      hitter.y = 11
      hitter.hit = false
      hitter = null;
    } else if (hitter) {
      hitter.hit = false
      hitter = null;
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

    s.text(`${score}`, 20, 576);
    for (var i = 0; i < lives; i++) {
      s.image(s.liveImage, (i * 30) + 225, 547, DIMENSION, DIMENSION)
    }

  }
}
