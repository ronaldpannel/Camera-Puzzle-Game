/**@type{HTMLCanvasElement} */

let VIDEO;
let CANVAS;
let CONTEXT;
let SCALER = 0.8;
let SIZE = { x: 0, y: 0, width: 0, height: 0, rows: 3, columns: 3 };
let PIECES = [];

function main() {
  CANVAS = document.getElementById("canvas1");
  CONTEXT = CANVAS.getContext("2d");

  let promise = navigator.mediaDevices.getUserMedia({ video: true });
  promise
    .then(function (signal) {
      VIDEO = document.createElement("video");
      VIDEO.srcObject = signal;
      VIDEO.play();

      VIDEO.onloadeddata = function () {
        handleResize();
        //window.addEventListener("resize", handleResize);
        initPieces(SIZE.rows, SIZE.columns);
        //randomizePieces();
        updateCanvas();
      };
    })
    .catch(function (err) {
      alert("camera  error; " + err);
    });
}

function handleResize() {
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;
  let resizer =
    SCALER *
    Math.min(
      window.innerWidth / VIDEO.videoWidth,
      window.innerHeight / VIDEO.videoHeight
    );
  SIZE.width = resizer * VIDEO.videoWidth;
  SIZE.height = resizer * VIDEO.videoHeight;
  SIZE.x = window.innerWidth / 2 - SIZE.width / 2;
  SIZE.y = window.innerHeight / 2 - SIZE.height / 2;
}
function updateCanvas() {
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.videoHeight);
  CONTEXT.globalAlpha = 0.05;
  CONTEXT.drawImage(VIDEO, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
  CONTEXT.globalAlpha = 1;
  for (let i = 0; i < PIECES.length; i++) {
    PIECES[i].draw(CONTEXT);
  }
  window.requestAnimationFrame(updateCanvas);
}

function initPieces(rows, cols) {
  SIZE.rows = rows;
  SIZE.columns = cols;
  PIECES = [];
  for (let i = 0; i < SIZE.rows; i++) {
    for (let j = 0; j < SIZE.columns; j++) {
      PIECES.push(new Piece(i, j));
    }
  }
}

function randomizePieces() {
  for (let i = 0; i < PIECES.length; i++) {
    let loc = {
      x: Math.random() * (CANVAS.width - PIECES[i].width),
      y: Math.random() * (CANVAS.height - PIECES[i].height),
    };
    PIECES[i].x = loc.x;
    PIECES[i].y = loc.y;
  }
}

class Piece {
  constructor(rowIndex, colIndex) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.x = SIZE.x + (SIZE.width * this.colIndex) / SIZE.columns;
    this.y = SIZE.y + (SIZE.height * this.rowIndex) / SIZE.rows;
    this.width = SIZE.width / SIZE.columns;
    this.height = SIZE.height / SIZE.rows;
  }
  draw(CONTEXT) {
    CONTEXT.beginPath();

    CONTEXT.drawImage(
      VIDEO,
      (this.colIndex * VIDEO.videoWidth) / SIZE.columns,
      (this.rowIndex * VIDEO.videoHeight) / SIZE.rows,
      VIDEO.videoWidth / SIZE.columns,
      VIDEO.videoHeight / SIZE.rows,
      this.x,
      this.y,
      this.width,
      this.height
    );
    CONTEXT.rect(this.x, this.y, this.width, this.height);
    CONTEXT.stroke();
  }
}
