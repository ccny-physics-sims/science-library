function FBD(position_, howManyForces_,showResultant_) {

    this.mag = [];
    this.direction = [];
    this.labels = [];
    this.offsets = [];
    this.position = position_;
    this.howManyForces = howManyForces_;
    this.showResultant = showResultant_;
    if(this.showResultant === true){
      forcesColor = color(240,150,150);
    }
    else {
      forcesColor = color(230, 40, 40);
    }

    v1 = [];
    if(this.showResultant){
    resultant = new Arrow(position_,position_)
    resultant.color = color(230, 40, 40);
    resultant.grab = false;
    resultant.draggable = false;
    }

    for (var i = 0; i < this.howManyForces; i++) {

        v1[i] = new Arrow(position_, p5.Vector.add(position_, createVector(this.mag[i] * cos(this.direction[i]), this.mag[i] * sin(this.direction[i]))));
        v1[i].grab = false;
        v1[i].draggable = false;
        v1[i].color = forcesColor;
        v1[i].width=15;

    }


this.update = function() {
    temp1=createVector(0,0);
    for (var i = 0; i < this.howManyForces; i++) {
        v1[i].origin = this.position;
        v1[i].target = p5.Vector.add(this.position, createVector(this.mag[i] * cos(this.direction[i]), this.mag[i] * sin(this.direction[i])));
        temp1.add(p5.Vector.sub(v1[i].target,v1[i].origin));
        //console.log('arrow #'+ i + v1[i].target);
        v1[i].update();
    }
    if(this.showResultant){
        resultant.origin = this.position;
        resultant.target = p5.Vector.add(this.position,temp1);
        resultant.update();
      }

}

this.display = function() {

    for (var i = 0; i < this.howManyForces; i++) {
        fill(0);
        push();
        translate(this.xoffsets[i],this.yoffsets[i]);
        v1[i].display();
        pop();

    }
    for (var i = 0; i < this.howManyForces; i++) {
      push();
      translate(this.xoffsets[i],this.yoffsets[i]);
      text(this.labels[i],15+v1[i].target.x,v1[i].target.y,100,100);
      pop();
    }
    if(this.showResultant){
    if(temp1.mag() > 0.0001){
      text('Net Force',15+resultant.target.x,resultant.target.y,100,100);

    resultant.display();
    }
    }
    //make a dot
    push()
    fill(30,100);
    ellipse(this.position.x, this.position.y, 20, 20)
    pop()


}

}
