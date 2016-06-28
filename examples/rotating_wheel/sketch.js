/*demonstrates pure rotation of a wheel without translation.*/

function setup(){
    createCanvas(640,480);
    w = new wheel(width/2,height/2,200);
    w.rotate = true;

    w.cdecorate = false;
    w.vdecorate = true;
    w.rotation = true;
    w.translation = false;
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
