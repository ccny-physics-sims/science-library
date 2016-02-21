aForceVector = [];
howMany = 20;


function setup() {
createCanvas(800 , 800);
frameRate(30);

startPoint = createVector(width/2, height/2);
vdisp = createVector(random(-50,50),random(-50,50));
endPoint = p5.Vector.add(startPoint,vdisp)

aForceVector[0] = new Arrow(startPoint, endPoint);
aForceVector[0].color = color(140,140,150);
for(var i=1; i<howMany;i++){
aForceVector[i] = new Arrow(aForceVector[i-1].target, p5.Vector.add(aForceVector[i-1].target,createVector(random(-30,30),random(-30,30))));
aForceVector[i].color = color(random(30,250),random(30,250),random(30,250));
aForceVector[i].grab = false;
aForceVector[i].drag = false;

}

}

function draw() {

background(250);
to = min([99*mouseY/height, howMany]);
for(var i=0; i<to;i++){
aForceVector[i].display();
aForceVector[i].update();
}
}
