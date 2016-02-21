aForceVector = [];

function setup() {
  createCanvas(800, 500);
  frameRate(30);

  startPoint = createVector(width / 2, height / 2);
  vdisp = createVector(random(-100, 100), random(-100, 100));
  vdisp2 = createVector(random(-100, 100), random(-100, 100));

  midPoint = p5.Vector.add(startPoint, vdisp)
  endPoint = p5.Vector.add(midPoint, vdisp2)

  aForceVector[0] = new Arrow(startPoint, midPoint);
  aForceVector[0].color = 'red';
  aForceVector[1] = new Arrow(midPoint, endPoint);
  aForceVector[1].color = 'blue';

  theResultant = new Arrow(startPoint, endPoint);
  theResultant.color = 'purple';
  theResultant.grab = 'false';
  theResultant.drag = 'true';
}



function draw() {

  background(250);

  for (var i = 0; i < 2; i++) {
    aForceVector[i].display();
    aForceVector[i].update();
  }

  var temp1 = aForceVector[0].target.copy();
  var temp2 = aForceVector[1].target.copy();
  temp1.sub(aForceVector[0].origin);
  temp2.sub(aForceVector[1].origin);
  temp1.add(temp2);
  theResultant.target.x = temp1.x + theResultant.origin.x;
  theResultant.target.y = temp1.y + theResultant.origin.y;
  theResultant.display();
  theResultant.update();
  //console.log(somethingIsDragging);
}
