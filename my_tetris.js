my_tetris.js
const btnStart = document.getElementById("start-button");
const btnPause = document.getElementById("pause-button");

const myAudioFile = new Audio("./audio/audio.mp3");
const clearAudioFile = new Audio("./audio/clear.mp3");
const themeSongFile = new Audio("./audio/TetThmSongs.mp3");

function playGameSound() {
  clearAudioFile.play();
}

function playGsound() {
  myAudioFile.play();
}

function strtThmSng() {
  themeSongFile.loop = true;
  themeSongFile.play();
}

function stpThmeSong() {
  themeSongFile.pause();
}

const AI = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
];

const AJ = [
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
];

const AL = [
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
];

const AO = [
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
];

const AS = [
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const AT = [
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const AZ = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
];



const mainGameCanvas = document.getElementById("game_canv");
const mainCanvasContext = mainGameCanvas.getContext("2d");
const scoreElement = document.getElementById("score_board");
const lineElement = document.getElementById("squareline");
let currLine = (setLine = 0);
const Roww = (setRow = 20);
const Coluumnn = (setColumn = 10);
const SquaredSyz = (squareSize = 20);
const Emptycolor = "WHITE"; // color of an empty square

// draw a square
function drawSquARE(xCoordinate, yCoordinate, squareColor) {
  mainCanvasContext.fillStyle = squareColor;
  mainCanvasContext.fillRect(xCoordinate * SquaredSyz, yCoordinate * SquaredSyz, SquaredSyz, SquaredSyz);

  mainCanvasContext.strokeStyle = "white";
  mainCanvasContext.strokeRect(xCoordinate * SquaredSyz, yCoordinate * SquaredSyz, SquaredSyz, SquaredSyz);
}

//drawing piece for next tetromino

const secondCanvas = document.getElementById("second-canvas");
const secondCanvasContext = secondCanvas.getContext("2d");

const NUM_ROWS = (setRows = 4);
const NUM_COLS = (setCols = 4);
const NUM_SQUARES = (setSQrs = 20);
const VACANTs = (vacantColor = "WHITE"); // color of an empty square

// using x and y coordinate draw a square and specify a color
const drawCanvSquares = (xCoordinate, yCoordinate, color) => {
  secondCanvasContext.fillStyle = color;
  secondCanvasContext.fillRect(
    xCoordinate * NUM_SQUARES,
    yCoordinate * NUM_SQUARES,
    NUM_SQUARES,
    NUM_SQUARES
  );

  secondCanvasContext.strokeStyle = "black";
  secondCanvasContext.strokeRect(
    xCoordinate * NUM_SQUARES,
    yCoordinate * NUM_SQUARES,
    NUM_SQUARES,
    NUM_SQUARES
  );
};

const GamEpIS = [
  [AZ, "red"],
  [AS, "green"],
  [AT, "purple"],
  [AO, "yellow"],
  [AL, "orange"],
  [AI, "cyan"],
  [AJ, "blue"],
];

let isGameRunning = false;

btnStart.addEventListener("click", () => {
  if (!isGameRunning) {
    isGameRunning = true;
    document.addEventListener("keydown", CtrlPoint);
    btnStart.disabled = true;
    btnPause.disabled = false;
    // cal the function to start the game
    strtThmSng();
    downDrop();
  }
});

btnPause.addEventListener("click", () => {
  if (isGameRunning) {
    isGameRunning = false;
    btnStart.disabled = false;
    btnPause.disabled = true;
    document.removeEventListener("keydown", CtrlPoint);
    stpThmeSong();
    // call the function to Pause the game
    animate_pause();
  }
});

// create the game board

let board_ = [];
for (rw = 0; rw < Roww; rw++) {
  board_[rw] = [];
  for (cl = 0; cl < Coluumnn; cl++) {
    board_[rw][cl] = Emptycolor;
  }
}

function drawBoxxx() {
  for (r = 0; r < Roww; r++) {
    for (c = 0; c < Coluumnn; c++) {
      drawSquARE(c, r, board_[r][c]);
    }
  }
}

drawBoxxx();

// object piece
function creationOfRandomPieces() {
  let r = (randomN = Math.floor(Math.random() * GamEpIS.length)); // 0 -> 6

  f = new tetPiiecEs(GamEpIS[r][0], GamEpIS[r][1]);
  return f;
}

/**
 *
 *
 *
 *
 * STOP SATURDAY 20th April
 *
 *
 *
 *
 */

// Create an empty 2D array for the next tetrimino board
let nextShapesBoard = [];
for (let r = 0; r < NUM_ROWS; r++) {
  nextShapesBoard[r] = [];
  for (let c = 0; c < NUM_COLS; c++) {
    nextShapesBoard[r][c] = VACANTs;
  }
}

// Draw the next tetrimino board
function drawNxTBoard() {
  for (let r = 0; r < NUM_ROWS; r++) {
    for (let c = 0; c < NUM_COLS; c++) {
      drawCanvSquares(c, r, nextShapesBoard[r][c]);
    }
  }
}

// Function to display the next tetrimino shape
function displayNxtShape(nextPiece_) {
  // Clear the next tetrimino board
  for (let r = 0; r < NUM_ROWS; r++) {
    for (let c = 0; c < NUM_COLS; c++) {
      nextShapesBoard[r][c] = VACANTs;
    }
  }
  // Draw the next tetrimino shape on the board
  for (let r = 0; r < nextPiece_.tetromino[nextPiece_.tetrominoN].length; r++) {
    for (
      let c = 0;
      c < nextPiece_.tetromino[nextPiece_.tetrominoN].length;
      c++
    ) {
      if (nextPiece_.tetromino[nextPiece_.tetrominoN][r][c]) {
        nextShapesBoard[r][c] = nextPiece_.color;
      }
    }
  }
  drawNxTBoard();
}

let nextPiece = creationOfRandomPieces();
displayNxtShape(nextPiece);

let p = creationOfRandomPieces();

function tetPiiecEs(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN = 0; // we start from the first pattern
  this.activeTetromino = this.tetromino[this.tetrominoN];

  // we need to control the pieces

  if (color == "yellow" || color == "cyan") {
    this.x = 3;
    this.y = -1;
  }
  if (color == "green" || color == "red") {
    this.x = 2;
    this.y = -1;
  } else {
    this.x = 3;
    this.y = -1;
  }
}

// fill function

tetPiiecEs.prototype.fill = function (color) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // we draw only occupied squares
      if (this.activeTetromino[r][c]) {
        drawSquARE(this.x + c, this.y + r, color);
      }
    }
  }
};

// draw a piece to the board

tetPiiecEs.prototype.draw = function () {
  this.fill(this.color);
};

tetPiiecEs.prototype.unDraw = function () {
  this.fill(Emptycolor);
};

p.draw();

let score = 0;

// move piece down
tetPiiecEs.prototype.moveDown = function () {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw();
    this.y++;
    this.draw();
    // score += 10;
  } else {
    // we lock the piece and generate a new one
    p = nextPiece;

    this.lockShape();
    nextPiece = creationOfRandomPieces();
    displayNxtShape(nextPiece);
  }
  // scoreElement.innerHTML = score;
};

// move Right the piece
tetPiiecEs.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }
};

// move Left the piece
tetPiiecEs.prototype.moveShapeToLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x--;
    this.draw();
  }
};

// rotate the piece
tetPiiecEs.prototype.rotateShape = function () {
  let nextPatternToDisplay =
    this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
  let _kick__ = 0;

  if (this.collision(0, 0, nextPatternToDisplay)) {
    if (this.x > Coluumnn / 2) {
      // it's the right wall
      _kick__ = -1; // we need to move the piece to the left
    } else {
      // it's the left wall
      _kick__ = 1; // we need to move the piece to the right
    }
  }

  if (!this.collision(_kick__, 0, nextPatternToDisplay)) {
    this.unDraw();
    this.x += _kick__;
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  }
};

tetPiiecEs.prototype.lockShape = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // we skip the vacant squares
      if (!this.activeTetromino[r][c]) {
        continue;
      }
      // pieces to lock on top = game over
      if (this.y + r < 0) {
        alert("Game Over");
        stpThmeSong();
        window.location.reload(true);
        // stop request animation frame
        animate_pause();
        gameOver = true;
        break;
      }
      // we lock the piece
      board_[this.y + r][this.x + c] = this.color;
    }
  }
  // remove full rows
  for (r = 0; r < Roww; r++) {
    let isRowFull = true;
    for (c = 0; c < Coluumnn; c++) {
      isRowFull = isRowFull && board_[r][c] != Emptycolor;
    }
    if (isRowFull) {
      // if the row is full
      // we move down all the rows above it
      for (y = r; y > 1; y--) {
        for (c = 0; c < Coluumnn; c++) {
          board_[y][c] = board_[y - 1][c];
        }
      }
      // the top row board[0][..] has no row above it
      for (c = 0; c < Coluumnn; c++) {
        board_[0][c] = Emptycolor;
      }
      // increment the score
      currLine += 1;
      playGameSound();
    }
  }

  // call function to update the game board
  drawBoxxx();

  // update the score
  lineElement.innerHTML = currLine;
};

// collision function
tetPiiecEs.prototype.collision = function (xCoord_, yCoord_, currentPiece) {
  for (r = 0; r < currentPiece.length; r++) {
    for (c = 0; c < currentPiece.length; c++) {
      // if the square is empty, we skip it
      if (!currentPiece[r][c]) {
        continue;
      }
      // coordinates of the tetPiiecEs after movement
      let newX = this.x + c + xCoord_;
      let newY = this.y + r + yCoord_;

      // conditions
      if (newX < 0 || newX >= Coluumnn || newY >= Roww) {
        return true;
      }
      // skip newY < 0; board[-1] will crush our game
      if (newY < 0) {
        continue;
      }
      // check if there is a locked tetPiiecEs alrady in place
      if (board_[newY][newX] != Emptycolor) {
        return true;
      }
    }
  }
  return false;
};

// hard downDrop function downDrop piece instantlly to board

tetPiiecEs.prototype.hardDrop = function () {
  while (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw();
    this.y++;
    this.draw();
  }

  this.lockShape();
  playGsound();
};

let anmation_stop;

// control piece key function
// document.addEventListener("keydown",CtrlPoint);

function CtrlPoint(event) {
  if (event.keyCode == 37 || event.keyCode == 52) {
    playGsound();
    p.moveShapeToLeft();
    dropStart = Date.now();
  } else if (
    event.keyCode == 38 ||
    event.keyCode == 49 ||
    event.keyCode == 53 ||
    event.keyCode == 57
  ) {
    playGsound();
    p.rotateShape();
    dropStart = Date.now();
  } else if (event.keyCode == 39 || event.keyCode == 54) {
    playGsound();
    p.moveRight();
    dropStart = Date.now();
  } else if (event.keyCode == 40 || event.keyCode == 56) {
    score += 1;
    playGsound();
    p.moveDown();
  } else if (event.keyCode == 80) {
    if (isGameRunning == true) {
      isGameRunning = false;
      btnStart.disabled = false;
      btnPause.disabled = true;

      stpThmeSong();
      animate_pause();
    } else {
      isGameRunning = true;
      btnStart.disabled = true;
      btnPause.disabled = false;

      strtThmSng();
      downDrop();
    }
  } else if (event.keyCode == 32) {
    p.hardDrop();
    score += 12;
  } else if (event.keyCode == 27) {
    window.close();
  }
  scoreElement.innerHTML = score;
}

let dropStart = Date.now();

function downDrop() {
  let now = Date.now();
  let delta = now - dropStart;

  if (delta > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }
  // p.moveDown();
  anmation_stop = requestAnimationFrame(downDrop);
}

function animate_pause() {
  cancelAnimationFrame(anmation_stop);
}

function commence_AnimE() {
  if (!animationFrameId) {
    draw(); // Start the animation
  }
}