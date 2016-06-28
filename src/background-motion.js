
var movingBackground = function(whichKind_,position_,velocity_,acceleration_) {
  maxHeight = 100;

  this.velocity = velocity_;
  this.position = position_;
  this.acceleration = acceleration_;
  this.whichKind = whichKind_;
  this.shapes = [];

  if (this.whichKind == 'cityStreet'){
    this.makeCityStreet();
  }
  if (this.whichKind == 'clouds'){
    this.makeClouds();
  }
}

movingBackground.prototype.makeCityStreet = function() {

  noOfBuildings = ((5*width)/70);
  rectMode(CORNERS);
  for (i=0;i<noOfBuildings;i++){
  this.shapes.push(new backgroundShape(this.whichKind,this.velocity))
  this.shapes[i].position = createVector(-(width*2)+(i*70),this.position.y);
  this.shapes[i].name = 'bldg '+i;
  this.shapes[i].layer = i;
  this.shapes[i].scale = 3;

  }
  this.l = this.shapes.length;


}

movingBackground.prototype.makeClouds = function() {
  noOfClouds = ((2*width)/10);
  for (i=0;i<noOfClouds;i++){
  this.shapes.push(new backgroundShape(this.whichKind,this.velocity))
  this.shapes[i].position = createVector(random(-width,2*width),random(-height,2*height));
  this.shapes[i].name = 'cloud '+i;
  this.shapes[i].layer = i;
  this.shapes[i].scale = 2;
  }
  this.l = this.shapes.length;


}

movingBackground.prototype.update = function() {
  this.velocity.add(this.acceleration);
}

movingBackground.prototype.display = function(){

    for (i = this.l-1; i >= 0; i--){
      this.shapes[i].run();
    }
}

var backgroundShape = function(whichKind_,velocity_) {

  this.howTall = random(40,maxHeight);
  this.howWide = random(20,100);
  this.fill = random(60,230);

  this.whichKind = whichKind_;
  this.velocity = velocity_;

}

backgroundShape.prototype.run = function() {
  this.needsMoving()
  this.update();

  //only display the ones near the canvas
    if (this.position.x < width+100 && this.position.x > -100 && this.position.y > -100 && this.position.y < height+100){
    this.display();
    }
};

backgroundShape.prototype.update = function(){

  if(this.whichKind == 'cityStreet'){
  rectMode(CORNERS);
  this.position.add(this.velocity);
  }

  if(this.whichKind == 'clouds'){
    this.position.add(p5.Vector.mult(this.velocity,(noOfClouds-this.layer)/noOfClouds));
  }

};

backgroundShape.prototype.display = function(){

  if(this.whichKind == 'cityStreet'){

  push();
  fill(this.fill);
  noStroke();
  rect(this.position.x, this.position.y , this.position.x+this.howWide, this.position.y-this.howTall);
  //text(this.name,this.position.x,this.position.y+40)
  pop();

  push();
  stroke(0);
  line(0,this.position.y,width,this.position.y);
  pop();
  }

  if(this.whichKind == 'clouds'){
  this.scale = 2;
  push();
  fill(this.fill,200);
  noStroke();
  ellipse(this.position.x, this.position.y , this.howWide, this.howWide);
  //text(this.name,this.position.x,this.position.y+40)
  pop();
  }

};

backgroundShape.prototype.needsMoving = function(){

  if (this.position.x < -(width*(this.scale-1))) {
      this.position.x = width*this.scale;
  }
  if (this.position.x > (width*(this.scale))) {
      this.position.x = -width*(this.scale-1);
  }
  if (this.position.y < -(height*(this.scale-1))) {
      this.position.y = height*this.scale;
  }
  if (this.position.y > (height*this.scale)) {
      this.position.y = -height*(this.scale-1);
  }
};
