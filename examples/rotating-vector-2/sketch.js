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
  aVector.color = color('purple');
  aVector.grab = false;
  aVector.draggable = false;
  aVector.showComponents = false;

}



function draw() {

  background(250);

  //makes an x-y coordinate axis
  stroke('gray');
  line(width/2,0,width/2,height);
  line(0,height/2,width,height/2);

  // sets a rotation in the CCW direction
  theta=-frameCount/200;

  //both the origin and the endpoint are moving now, but the length stays the same.
  aVector.origin = p5.Vector.add(startPoint,createVector(2*lengthV*cos(theta),2*lengthV*sin(theta)));
  aVector.target = p5.Vector.add(startPoint,createVector(lengthV*cos(theta),lengthV*sin(theta)));
  aVector.update();
  aVector.display();

  //just draw some other things
  push();
  noFill();
  stroke('black')
  ellipse(width / 2, height / 2, 4*lengthV, 4*lengthV);
  pop();
  push();
  fill('black');
  ellipse(width / 2, height / 2, 5, 5);
  pop()
  }
