/*demonstrates a wheel that spins without slipping.*/

function setup(){
    createCanvas(640,480);
    w = new wheel(width/2,height/2,200);
    w.rotate = true;

    w.cdecorate = false;
    w.vdecorate = true;
    w.rotation = true;
    w.translation = true;
    angleMode(DEGREES);

    // "on" is used for the pause and resume at the end of file
    // that allows for stopping/starting the sketch w/o prob.
    on = true;


    //create controls for sketch
    rotate_speed = createSlider(0.1,5,2,0.2);
    rotate_speed.position(20,60)

    btn_pause = createButton('Pause');
    btn_pause.position(20,100);
    btn_pause.mouseClicked(ptoggle);
}
function draw(){
    background(121,209,254);

    //draw text for controls
    text('Rotation Speed',20,40);

    //draw ground
    noStroke();
    fill('grey');
    rect(0,w.y+w.r,width,height);
    //draw the wheel.
    w.draw();    
    //get speed from slider
    w.ang_speed = rotate_speed.value();

    //code that handles the moving loop of the wheel.
    if(w.x > 2*w.r*PI+width/4) w.x = -width/4;
    w.x += w.ang_speed/180 * w.r*PI;
}
function ptoggle(){
    if(on == true){
        on = false;
        noLoop();
        btn_pause.html('Play');
    }
    else{
        on = true;
        loop();
        btn_pause.html('Pause');
    }
}
