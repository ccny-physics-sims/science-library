function setup(){
    createCanvas(640,480);
    w = new wheel(width/3,height/2,150);
    w2 = new wheel(2*width/3,height/2,150);

    w.rotate = true;
    w2.rotate = true;

    w.rotation = true;
    w.translation = false;
    w.rimColor = color('rgba(0,0,0,1)');
    w.spokeColor = color('rgba(0,0,0,1)');
    w.wheelColor = color('rgba(0,0,0,.1)');


    angleMode(DEGREES);

    // "on" is used for the pause and resume at the end of file
    // that allows for stopping/starting the sketch w/o prob.
    on = true;


    //create controls for sketch
    btn_pause = createButton('Pause');
    btn_pause.position(20,20);
    btn_pause.mouseClicked(ptoggle);
    btn_pause.parent('sketch-holder');



}
function draw(){
    background(230);
    drawAxes();



    w.ang_speed = map(mouseX,0,width,-5,5)*PI/180;
    w2.ang_speed = map(mouseY,0,height,-5,5)*PI/180;
    w.draw();
    w2.draw();


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
