/*Electricity and Magentism Library
 *
 * GOAL: the objective of this library is to provide
 * a series of objects that can be used to simulate 
 * various electromagnetic principles for educational
 * purposes.
 *
 * LEAD PROGRAMMER: Avraham Areman
 * PROJECT COORDINATOR: Prof. J. Hedberg
 * CONTRIBUTORS:__________
 *
 * PROJECT OPENED: 7/10/2016
 * PROJECT CLOSED: pending...
 *
 * LIBRARY CONTENTS:
 *  > charge
 *  > field (mag./elec.)
 *  > magnets (pending...)
 *  > conductors (pending...)
 *  > 
 * */

//Global functions
// stub...
function listCmp(arr){
    arr.sort();
    return arr[arr.length-1];
}
function distance(a,b){
    return sqrt((b.x-a.x)*(b.x-a.x)+(b.y-a.y)*(b.y-a.y));
}
//drawVector function borrowed from nature of code.
//by Dan Shiffman.
//TODO: improve the drawing function somehow.
var drawVector = function(v, x, y, scayl) {
  push();
  var arrowsize = 2;
  //var arrowsize = map(v.mag(),.1,.6,.8,2);
  // Translate to location to render vector
  translate(x,y);


  //stroke(color(v.mag()*2,100,100));
  //stroke(color(100,100,100),100);
  //stroke(0,0,0,0)
  //stroke(0);
  stroke(color(0,0,0,map(v.mag(),0.2,0.8,20,100)))
  //strokeWeight(map(v.mag(),0.2,.9,.5,1.5));
  // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
  rotate(v.heading());
  // Calculate length of vector & scale it to be bigger or smaller if necessary
  //var len = v.mag()+scayl;
  var len = 10
  //var len = map(v.mag(),.1,.6,6,10);
  // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
  //ellipse(0,0,2,2);
  line(0,0,len,0);
  if(len !==0){
  line(len,0,len-arrowsize,+arrowsize/2);
  line(len,0,len-arrowsize,-arrowsize/2);
  }
  pop();
}




//Objects
//====================
//  Charge Object
//====================
var charge = function(_x, _y, _c = 0, _s = 10){
    this.x = _x;
    this.y = _y;
    this.size = _s;
    this.charge = _c;    //keeping track of charge.
};
charge.prototype.draw = function(){
    //draws a circle whose width and height
    //are proportional to its charge.
    //additionally, the color of the charge 
    //is proportional to its charge (red is positive, blue
    //is negative).
    push();
    noStroke();
    var label;
    if(this.charge < 0){
        fill(0,0,255);
        //stroke(0,0,255);
        label = '-';
    }
    else{
        fill(255,0,0);
        //stroke(255,0,0);
        label = '+';
    }

    ellipse(this.x,this.y,this.size,this.size);
    fill(255,255,0,255);
    textAlign(CENTER,CENTER);
    text(label,this.x,this.y+1);
    pop();
};

//====================
//  Magnet Object -- incomplete
//====================
var magnet = function(_x, _y, _m = 0, _s = 10, st_Type = 'bar'){
    this.x = _x;
    this.y = _y;
    this.mag = _m; //strength of magnet.

    this.fixed = true; // if this is true then the magnet will
                       // will not move to interact with other
                       // magnets.

    this.north = Math.abs(_m);
    this.south = -1*this.north;

    this.size = _s; // sets the rough size. exact size may vary 
                    // depending on the magnet type.

    this.type = st_Type; //'bar', 'horseshoe', and 
};
magnet.prototype.draw = function(){
    if(this.type == 'bar'){
        //draw bar magnet...
        fill(255,0,0);
        rect(this.x-this.size,this.y-this.size,
             this.size,this.size);
        fill(100);
        rect(this.x-this.size,this.y,
             this.size,this.size);
    }
    else if(this.type == 'horseshoe'){
        //draw horseshoe...
    }
    else{
        //draw bar... (as the default).
    }
};
magnet.prototype.setType = function(st_Type){
    if(st_Type == 'bar' || st_Type == 'horseshoe'){
        this.type = st_Type;
    }
    else{
        this.type = 'bar';
    }
};
magnet.prototype.flipPoles = function(){
    var temp = this.north;
    this.north = this.south;
    this.south = temp;
};

//====================
//  Field Object
//====================
//the field object is used for both electric
//and magnetic objects.
var field = function(_x=0,_y=0,_w=width,_h=height){
    this.x = _x;
    this.y = _y;
    this.width = _w;
    this.height = _h;

    this.type = "efield"; //other choice is mfield.
    this.objects = [];

    this.resoloution = 20;
};
field.prototype.draw = function(){
    //TODO: add other type of field (magnetic).
    //TODO: make diff. between color and linefield
    //display modes.

    //draws the field background.
    //draws the objects themselves.
    for(var i = 0;i<this.objects.length;i++){
        //set the coloring
        push();
        noStroke();
        var intensity = 255 * this.objects[i].charge/100;
        if(intensity < 0) intensity *=-1;
        if(this.objects[i].charge < 0) 
            fill(0,0,255,intensity*1/this.resoloution);
        else 
            fill(255,0,0,intensity*1/this.resoloution);

        //figure out biggest radius
        var ldist = listCmp([this.objects[i].x,this.objects[i].y,
                width-this.objects[i].x,height-this.objects[i].y]);
        var ld = ldist;
        for(var j = 0;j<this.resoloution;j++){
            ellipse(this.objects[i].x,this.objects[i].y,
                    ldist*2,ldist*2);
            ldist -= ld/this.resoloution;
        }
        pop();
        this.objects[i].draw();
    }
};

//====================
//  Point Particle
//====================
var po = function(_x=width/5*3,_y=height/5*3,_v=100){
    this.x = _x;
    this.y = _y;
    this.value = _v;

    this.grid;
    this.resoloution = 10; 
};
po.prototype.draw = function(){
    push();
    if(this.value > 0) fill(255,0,0);
    else fill(0,0,255);
    ellipse(this.x,this.y,this.value/4,this.value/4);

    stroke(200);
    strokeWeight(2);
    fill(0);
    textSize(17);
    textAlign(CENTER,CENTER);
    if(this.value > 0){
        text('+',this.x,this.y);
    }
    else{
        text('-',this.x,this.y);
    }
    pop();
};
po.prototype.figCharge = function(){
    this.makeGrid();
    for(var i = 0;i<this.grid.length;i++){
        for(var j = 0;j<this.grid[i].length;j++){
           this.grid[i][j] = this.c_eq(width/this.resoloution*i,
                                         height/this.resoloution*j); 
           
        }
    }
    //printGrid(this.grid,this.resoloution,this.value);
};
function printGrid(a,res,val=0){
    for(var i = 0;i<a.length;i++){
        for(var j = 0;j<a[i].length;j++){
            //console.log("("+i+","+j+")"+"("+a[i][j].x +","+a[i][j].y+")");
            //console.log("("+i+","+j+")"+'mag: ' + a[i][j].mag());
            fill(0);
            drawVector(a[i][j],width/res*i,height/res*j,val);
        }
    }
}
po.prototype.c_eq = function(x,y){
    var xdif,ydif;
    var charge = createVector((x-this.x),(y-this.y));
    charge.normalize();
    charge.mult(this.value);
    var d = dist(x,y,this.x,this.y);
    charge.mult(1/d);
    return charge;
};
po.prototype.makeGrid = function(){
    this.grid = [];
    for(var i = 0;i<this.resoloution;i++){
           var temp = []
        for(var j=0;j<this.resoloution;j++){
           temp.push([]); 
        }
        this.grid.push(temp);
    }
};

//====================
//  Field2 Object
//====================
//the field object is used for both electric
//and magnetic objects.
var field2 = function(_x=0,_y=0,_w=width,_h=height){
    this.x = _x;
    this.y = _y;
    this.width = _w;
    this.height = _h;

    this.type = "efield"; //other choice is mfield.
    this.objects = [];

    this.grid;
    this.resoloution = 10;
};
field2.prototype.draw = function(){
    //TODO: add other type of field (magnetic).
    //TODO: make diff. between color and linefield
    //display modes.
    
    //TODO: add vectors to various objects so that they can
    //be summed together here in two dimentsions.
    //calculate grid values
    this.makeGrid();
    for(var i =0;i<this.objects.length;i++){
        this.objects[i].figCharge();
    }
    for(var i = 0;i<this.grid.length;i++){
        for(var j = 0;j<this.grid[i].length;j++){
           this.grid[i][j] = createVector(0,0);
           for(var k = 0;k<this.objects.length;k++){
               this.grid[i][j].add(this.objects[k].grid[i][j]);
           }
        }
    }
    //draws the objects themselves.
    printGrid(this.grid,this.resoloution);
    for(var i =0;i<this.objects.length;i++){
        this.objects[i].draw();
    }
    //console.log('draw()');
};
field2.prototype.makeGrid = function(){
    this.grid = [];
    for(var i = 0;i<this.resoloution;i++){
           var temp = []
        for(var j=0;j<this.resoloution;j++){
           temp.push([]); 
        }
        this.grid.push(temp);
    }
};
field2.prototype.setRes = function(res){
    this.resoloution = res;
    for(var i = 0; i<this.objects.length;i++){
        this.objects[i].resoloution = res;
    }
};
field2.prototype.addCharge = function(_x=width/2,_y=height/2,_v=100){
    var charge = new po(_x,_y,_v);
    this.objects.push(charge);
};
field2.prototype.dragCheck = function(){
    this.objects[this.objects.length-1].x = mouseX;
    this.objects[this.objects.length-1].y = mouseY;
};
