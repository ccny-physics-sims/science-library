//TODO: wheel object for rotating.
//TODO: make a smart rotate that rotates and moves along
//the ground at the correct (non-slipping) speed.
var wheel = function(_x,_y,_d){
    this.x = _x; //x position
    this.y = _y; //y position
    this.r = _d/2; //radius
    this.d = _d;

    //rotation variables
    this.rotate = false;
    this.ang = 0;
    this.ang_speed = 1;

    //decorations for wheel
    this.vdecorate = false;
    this.cdecorate = true;

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
    //arrow display options
    //-> static/relative
};
wheel.prototype.draw = function(){
    push();
    //angleMode(DEGREES);
    translate(this.x,this.y);
    //manage the rotation if this.rotate == true
    if(this.rotate == true){
        rotate(this.ang);
        this.ang += this.ang_speed;
        if(this.ang >= 360) this.ang = 0;
    }
    //draw the circles
    fill(0);
    ellipse(0,0,this.d,this.d);
    fill(200);
    ellipse(0,0,this.d*0.8,this.d*0.8); 
    fill(0);
    //ellipse(0,0,this.d*0.05,this.d*0.05); 
    
    //draw the spokes of the wheel
    stroke(0);
    for(var i = 0;i<16;i++){
        line(0,0,
             (this.r-2)*cos(30*i),
             (this.r-2)*sin(30*i));
    }

    //..............................
    // draw the decorations if any
    //..............................
    
    if(this.cdecorate == true){
        //tire markers (ie. points A & B) for distance S
            //arc colors for length S
        stroke(255,0,0);
        strokeWeight(4);
        noFill();
        arc(0,0,this.d,this.d,0,180);
        stroke(0,0,255);
        arc(0,0,this.d,this.d,180,360);
            //point colors
        noStroke();
        fill(255,0,0); //red for point A;
        ellipse(this.r,0,10,10);
        fill(30,30,255); //blue for point B;
        ellipse(-this.r,0,10,10);
    }
    pop();
    if(this.vdecorate == true){
        //translation vector
        if(this.rotation == true){
            this.a1.origin.x = this.x;
            this.a1.origin.y = this.y-this.r;
            this.a1.target.x = this.x+this.r;
            this.a1.target.y = this.y-this.r;

            this.a2.origin.x = this.x;
            this.a2.origin.y = this.y+this.r;
            this.a2.target.x = this.x-this.r;
            this.a2.target.y = this.y+this.r;
            
            this.a1.update();
            this.a2.update();
            this.a1.display();
            this.a2.display();
        }
        //spin vector
        else if(this.translation == true){
            this.a1.origin.x = this.x;
            this.a1.origin.y = this.y-this.r;
            this.a1.target.x = this.x+this.r;
            this.a1.target.y = this.y-this.r;

            this.a2.origin.x = this.x;
            this.a2.origin.y = this.y;
            this.a2.target.x = this.x+this.r;
            this.a2.target.y = this.y;
            
            this.a3.origin.x = this.x;
            this.a3.origin.y = this.y+this.r;
            this.a3.target.x = this.x+this.r;
            this.a3.target.y = this.y+this.r;

            this.a1.update();
            this.a2.update();
            this.a3.update();
            this.a1.display();
            this.a2.display();
            this.a3.display();
            
        }
    }
};
wheel.prototype.update = function(){};
