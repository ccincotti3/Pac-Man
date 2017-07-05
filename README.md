## Pacman

### Background

Pac-Man is a 1-player game where the player navigates 'Pac-Man' through a rectangular maze. The goal is to collect all the dots, known as Pac-Dots while also avoiding enemy ghosts. The player is given three 'lives', and on contact with the ghosts, the player loses a life. On loss of three lives - play is over and the game is restarted. Once the all dots are collected, the player wins.

### Functionality & MVP

In this version of Pac-Man, users will be able to:

- [ ] Start, pause, and reset the game board
- [ ] Roam the maze and collect Pac-Dots
- [ ] Defend against enemy ghosts through consumption of Power Pellets

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, instructions, and navigation links to my Github, LinkedIn, and personal website. Game controls will include start, pause, reset buttons, and the directional pad to control Pac-Man. The bottom player information panel will keep track of score, lives, and level.

![wireframes](/assets/wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- `JavaScript` for game logic,
- `p5.js` for maze and object rendering to browser.
- `Webpack` for bundling files into single entry file.

In addition to the entry file, there will be three scripts involved in this project:

`grid.js`: this script will handle the grid rendering. Grid will involve rigid bodies, and Pac-Man will be able to exit on the left/right and enter on the opposite side.

`game.js`: this script will handle the game logic involving game initialization, game completion, and score-keeping.
Additionally, it will be used to keep track of Pac-Dot consumption logic, Pac-Dot count, Power Pellet consumption logic, and collision detection.

`ghost.js`: this script involves the artificial intelligence for ghost's, as well as movement logic during 'power mode' (when Pac-Man consumes a Power Pellet). During normal play, the ghost's will move toward Pac-Man through checking the shortest distance to Pac-Man and taking that route. During 'power mode', the ghosts should move away from Pac-Man.

`pacman.js`: this script will handle Pac-Man movements.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running. Write a basic entry file and the bare bones of all 4 scripts outlined above. Research the `p5.js` API. Goals for the day:

- Use `p5.js` to objects to the browser.

**Day 2**: Build out the grid and render to the browser. Connect Pac-Man and other objects to the grid. Work on Pac-Man and Ghost movement and collision detection.
Implement initialization logic of Pac-Man and Ghosts.  Goals for the day:

- Complete the `grid.js` using the `p5.js` library.
- Render a grid to the browser.
- Render Pac-Man and ghosts. Perform basic movements.
- Complete collision detection logic.

**Day 3**: Implement the game logic. Install the logic for game initialization and game completion. Complete Pac-Dot rendering and score-keeping. Add Power Pellet logic.  Goals for the day:

- Render a functioning grid with moving Pac-Man and Ghosts.
- Be able to move Pac-Man around the maze, lose lives, and collect Pac-Dots.
- Score keeping works, and increases with collection of Pac-Dots and ghost consumption.


**Day 4**: Polish off the styling of the game. Squash any bugs and continue implementing any bonus features.  Goals for the day:

- Style the overall layout of the game. Include navigation links, player panel, and instructions.


### Bonus features

- [ ] Add foods like cherries that can be consumed to increase points.
- [ ] Generate extra lives through reaching certain scores.
- [ ] Implement multiplayer.
