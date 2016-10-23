

function setup() {
  createCanvas(800, 500);
  frameRate(30);

  startPoint = createVector(width / 2, height / 2);
  vdisp = createVector(random(50, 150), random(-100, -50));



  endPoint = p5.Vector.add(startPoint, vdisp)

  aVector = new ArrowTouch(startPoint, endPoint);
  aVector.color = color(random(0,255),random(0,255),random(0,255));
  aVector.grab = true;
  aVector.draggable = true;
  aVector.showComponents = true;


}



function draw() {

  background(250);
aVector.color = color((mouseX/width)*255,(mouseY/height)*255,79);
  aVector.update();
  aVector.display();


push();
fill(0);
angle = atan2(aVector.target.y-aVector.origin.y,aVector.target.x-aVector.origin.x)*180/PI;

d = dist(aVector.origin.x,aVector.origin.y,aVector.target.x,aVector.target.y)
  translate( (aVector.origin.x+aVector.target.x)/2, (aVector.origin.y+aVector.target.y)/2 );
  rotate( atan2(aVector.target.y-aVector.origin.y,aVector.target.x-aVector.origin.x) );
  text("mag: "+nfc(d,1,1), 0, -15)
  text("angle: "+ nfc(angle,1,1), 70, -15);;
pop();

  }
