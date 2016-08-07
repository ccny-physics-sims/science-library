/*Rotating wheel sketch:
 * in this demo you can see that the distance traveled
 * by a non slipping wheel corresponds exactly to the 
 * distance traveled accross the ground.*/

function setup(){
    createCanvas(640,480);
    w = new wheel(width/4,height/2,120);
    w.rotate = true;    //make the wheel begin rotating
                        //at the begining.

    w.ang = -90;    //set the initial starting position
                    //to start on red.
                    
    w.cdecorate = true;
    w.vdecorate = true;
    w.rotation = true;
    w.translation = true;
    w.ang_speed = 2;
    angleMode(DEGREES);

    // "on" is used for the pause and resume at the end of file
    // that allows for stopping/starting the sketch w/o prob.
    on = true;
}
function draw(){
    background(121,209,254);

    //draw ground
    noStroke();
    fill('grey');
    rect(0,height/2+w.r+2,width,height/2-w.r-2);

    //draw the colored streaks on the ground
    push();
    stroke(255,0,0);
    strokeWeight(3); 
    line(width/4,height/2+w.r,PI*w.r+width/4,height/2+w.r);
    stroke(0,0,255);
    line(width/4+PI*w.r,height/2+w.r,2*PI*w.r+width/4,height/2+w.r);
    pop();

    //draw the wheel.
    w.draw();    

    //code that handles the moving loop of the wheel.
    if(w.x > 2*w.r*PI+width/4) w.x = width/4;
    w.x += w.ang_speed/180 * w.r*PI;
}
function mouseClicked(){
    if(on == true){
        on = false;
        noLoop();
    }
    else{
        on = true;
        loop();
    }
}
