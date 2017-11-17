function setup() {
  createCanvas(800, 500);
  background(250);
  frameRate(30);
  //lets make an array to fill
  y = new Array(800);

}


function draw() {
  background(250)
  stroke(0)
  //move things to the middle
  translate(0, height / 2)
  //x axis
  line(0, 0, width, 0)

  //calculate this points
  calcFunction();
  //display discrete points
  renderPoints();
  //display connected line
  renderLine();

}

function calcFunction() {
  //this function fills the aray with values
  for (var x = 0; x < y.length; x += 1) {
    y[x] = 100 * Math.sin(.01 * x)
  }

}

function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  noStroke()

  for (var x = 0; x < y.length; x += 10) {
    fill(0);
    ellipse(x, -y[x], 5, 5);
  }
}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke('red');

  beginShape();
  for (var x = 0; x < y.length; x += 2) {
    curveVertex(x, -y[x]);
  }
  endShape();
  pop();
}
