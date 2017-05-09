/*demonstrates pure translation of a Wheel without rotation.*/

function setup(){
    createCanvas(640,480);
    w = new Wheel(width/4,height/2,200);
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

    
    //create controls for sketch
    translate_speed = createSlider(.1,5,1,.2);
    translate_speed.position(20,60)

    btn_pause = createButton('Pause');
    btn_pause.position(20,100);
    btn_pause.mouseClicked(ptoggle);
}
function draw(){
    background(121,209,254);

    //draw text for the controls
    text('Translation Speed',20,40);

    //draw ground
    noStroke();
    fill('grey');
    rect(0,w.y+w.r,width,height);

    //draw the Wheel.
    w.draw();    

    //code that handles the moving loop of the Wheel.
    if(w.x-w.r > width) w.x = -w.d;
    w.x += translate_speed.value();
    w.trans_speed = translate_speed.value();
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
