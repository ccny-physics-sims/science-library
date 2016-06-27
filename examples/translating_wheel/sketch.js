/*demonstrates pure translation of a wheel without rotation.*/

function setup(){
    createCanvas(640,480);
    w = new wheel(width/4,height/2,200);
    w.rotate = false;
    frameRate(30);
    w.cdecorate = false;
    w.vdecorate = true;
    w.rotation = false;
    w.translation = true;
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
    rect(0,w.y+w.r,width,height);

    //draw the wheel.
    w.draw();    

    //code that handles the moving loop of the wheel.
    if(w.x-w.r > width) w.x = -w.d;
    w.x += 5;
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
