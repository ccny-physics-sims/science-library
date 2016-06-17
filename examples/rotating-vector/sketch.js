var theta, lengthV;

function setup() {
  createCanvas(800, 500);
  // the length of the vector is 100!
  lengthV = 100;
  //its startPoint (i.e. origin) is in the center of the canvas
  startPoint = createVector(width / 2, height / 2);
  //it will initially start
  vdisp = createVector(0, -lengthV);
  endPoint = p5.Vector.add(startPoint, vdisp)

  aVector = new Arrow(startPoint, endPoint);
  aVector.color = color('green');
  aVector.grab = false;
  aVector.draggable = false;
  aVector.showComponents = true;

}



function draw() {

  background(250);
  theta=frameCount/100;
  aVector.target = p5.Vector.add(startPoint, createVector(lengthV*cos(theta),lengthV*sin(theta)))

  aVector.update();
  aVector.display();


  }
