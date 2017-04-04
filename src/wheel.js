//TODO: wheel object for rotating.
//TODO: make a smart rotate that rotates and moves along
//the ground at the correct (non-slipping) speed.
var wheel = function(_x,_y,_d){
  angleMode(RADIANS);
    this.x = _x; //x position
    this.y = _y; //y position
    this.r = _d/2; //radius
    this.d = _d;
    this.arrowDecorations = [];
    this.arrows = [];
    this.rimColor = color('rgba(0,0,0,1)');
    this.spokeColor = color('rgba(0,0,0,1)');
    this.wheelColor = color('rgba(0,0,0,.1)');

    //rotation variables
    this.rotate = false;
    this.ang = 0;
    this.ang_speed = 0;

    //translation variables
    this.trans_speed = 0;

    //decorations for wheel
    this.vdecorate = false;
    this.cdecorate = false;

    //arrow vectors to display(not implemented)
    this.translation = false;
    this.rotation = false;
    this.rollingNoSlip = false;

    //actual arrow objects (only requires 3 to
    //display all of the modes)
    var orig = createVector(this.x,this.y);
    var temp = createVector(this.x+this.r,this.y-this.r);
    this.a1 = new Arrow(orig,temp);
    this.a2 = new Arrow(orig,temp);
    this.a3 = new Arrow(orig,temp);

    this.a1.width = 10;
    this.a2.width = 10;
    this.a3.width = 10;

    this.a1.color = color('green');
    this.a2.color = color('green');
    this.a3.color = color('green');

    this.a1.draggable = false;
    this.a1.grab = false;
    this.a2.draggable = false;
    this.a2.grab = false;
    this.a3.draggable = false;
    this.a3.grab = false;
    //arrow display options
    //-> static/relative




    this.addDecorations = function(_decorations) {

      for(i=0;i<this.arrowDecorations.length;i++){
        this.arrows[i] = new Arrow(createVector(0,this.arrowDecorations[i].location_radial*this.r),createVector(25*(this.ang_speed+this.trans_speed)*this.arrowDecorations[i].location_radial,this.arrowDecorations[i].location_radial*this.r));
        this.arrows[i].color = color('green');
        this.arrows[i].width = 10;
        this.arrows[i].draggable = false;
        this.arrows[i].grab = false;

      }

    }

    this.draw = function(){

    push();
    angleMode(RADIANS);
    translate(this.x,this.y);
    //manage the rotation if this.rotate == true
    if(this.rotate == true){
        rotate(this.ang);
        this.ang += this.ang_speed;
        //if(this.ang >= 2*Math.PI) this.ang = 0;
    }
    //draw the circles
    fill(this.wheelColor);
    stroke(this.rimColor);
    strokeWeight(this.r*.1);
    ellipse(0,0,this.d,this.d);
    //fill(color('rgba(200, 200, 200, .9)'));
    //ellipse(0,0,this.d*0.85,this.d*0.85);
    //fill(10);
    //ellipse(0,0,this.d*0.05,this.d*0.05);

    //draw the spokes of the wheel
    stroke(this.spokeColor);
    strokeWeight(2);
    for(var i = 0;i<16;i++){
        line(0,0,
             (this.r-2)*cos(Math.PI/6*i),
             (this.r-2)*sin(Math.PI/6*i));
    }

    //..............................
    // draw the decorations if any
    //..............................

for(i=0;i<this.arrowDecorations.length;i++){

  push();
  rotate(this.arrowDecorations[i].rimPos);
  this.arrows[i].target.x = -25*(this.ang_speed*this.r-this.trans_speed*Math.cos(-this.arrowDecorations[i].rimPos+this.ang))*this.arrowDecorations[i].location_radial;
  this.arrows[i].target.y = this.arrowDecorations[i].location_radial*this.r-25*(this.trans_speed*Math.sin(-this.arrowDecorations[i].rimPos+this.ang));
  this.arrows[i].update();
  this.arrows[i].display();
  pop();
}

    if(this.cdecorate == true){
        //tire markers (ie. points A & B) for distance S
            //arc colors for length S
        stroke(255,0,0);
        strokeWeight(4);
        noFill();
        arc(0,0,this.d,this.d,0,Math.PI);
        stroke(0,0,255);
        arc(0,0,this.d,this.d,Math.PI,2*Math>PI);
            //point colors
        noStroke();
        fill(255,0,0); //red for point A;
        ellipse(this.r,0,10,10);
        fill(30,30,255); //blue for point B;
        ellipse(-this.r,0,10,10);
    }
    pop();

    if(this.vdecorate == true){
        //rotation vector
        if(this.rotation == true){
            //a1 is the top right pointing arrow,
            //and a2 is the bottom left pointing
            //arrow.
            this.a1.origin.x = this.x;
            this.a1.origin.y = this.y-this.r;
            this.a1.target.x = this.x+25*this.ang_speed;
            this.a1.target.y = this.y-this.r;

            this.a2.origin.x = this.x;
            this.a2.origin.y = this.y+this.r;
            this.a2.target.x = this.x-25*this.ang_speed;
            this.a2.target.y = this.y+this.r;

            this.a1.update();
            this.a2.update();
            this.a1.display();
            this.a2.display();
        }
        //translation vector

        if(this.translation == true){
            //a1 is the topmost arrow, a2 is the middle arrow
            //and a3 is the bottom arrow.
            this.a1.origin.x = this.x;
            this.a1.origin.y = this.y-this.r;
            this.a1.target.x = this.x+25*this.trans_speed;
            this.a1.target.y = this.y-this.r;

            this.a2.origin.x = this.x;
            this.a2.origin.y = this.y;
            this.a2.target.x = this.x+25*this.trans_speed;
            this.a2.target.y = this.y;

            this.a3.origin.x = this.x;
            this.a3.origin.y = this.y+this.r;
            this.a3.target.x = this.x+25*this.trans_speed;
            this.a3.target.y = this.y+this.r;

            this.a1.update();
            this.a2.update();
            this.a3.update();
            this.a1.display();
            this.a2.display();
            this.a3.display();

        }
    }
  }
};

wheel.prototype.update = function(){};
