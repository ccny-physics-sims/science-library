/*demonstrates a wheel that spins without slipping.*/

function setup(){
    canvas = createCanvas(640,480);
    canvas.parent('sketch-holder');
    w = new wheel(width/2,height/2,200);
    w.rotate = true;

    w.rotation = true;
    w.translation = true;


    // "on" is used for the pause and resume at the end of file
    // that allows for stopping/starting the sketch w/o prob.
    on = true;


    //create controls for sketch
    trans_speed = createSlider(-5,5,2,0.2);
    trans_speed.position(20,60)

    btn_pause = createButton('Pause');
    btn_pause.position(20,100);
    btn_pause.mouseClicked(ptoggle);
}
function draw(){
    background(121,209,254);

    //draw text for controls
    text('Rotation Speed',20,40);

    //draw ground
    push()
    noStroke();
    fill('grey');
    rect(0,w.y+w.r,width,height);
    pop();
    //draw the wheel.
    w.draw();
    //get speed from slider


    //code that handles the moving loop of the wheel.
    if(w.x-w.r > width) w.x = -w.r;
    if(w.x+w.r < 0) w.x = width+w.r;
      w.x += trans_speed.value();
      w.trans_speed = trans_speed.value();
      w.ang_speed = w.trans_speed / (w.r-w.r*.1);
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
