/*demonstrates pure rotation of a wheel without translation.*/

//TODO trying to add water spraying out from the "slipping"
//wheel so that it looks more realistic. The code for it so far
//has been commented out. (need the correct js library as well as
//tweaking the values of the code to make it work).
function setup(){
    createCanvas(640,480);
    w = new wheel(width/2,height/2,200);
    w.rotate = true;

    w.cdecorate = false;
    w.vdecorate = false;
    w.rotation = true;
    w.translation = false;
    w.rimColor = color('rgba(0,0,0,1)');
    w.spokeColor = color('rgba(0,0,0,1)');
    w.wheelColor = color('rgba(0,0,0,.1)');

    w.arrowDecorations[0] = {type: 'velocity', location_radial: 1, rimPos: 0 };
    w.arrowDecorations[1] = {type: 'velocity', location_radial: .5, rimPos: 0 };
    w.arrowDecorations[2] = {type: 'velocity', location_radial: 1, rimPos: PI };
    w.arrowDecorations[3] = {type: 'velocity', location_radial: .5, rimPos: PI };
    w.arrowDecorations[4] = {type: 'velocity', location_radial: 1, rimPos: HALF_PI };
    w.arrowDecorations[5] = {type: 'velocity', location_radial: .5, rimPos: HALF_PI };
    w.arrowDecorations[6] = {type: 'velocity', location_radial: 1, rimPos: 3*HALF_PI };
    w.arrowDecorations[7] = {type: 'velocity', location_radial: .5, rimPos: 3*HALF_PI };
    w.addDecorations(w.arrowDecorations);


    // "on" is used for the pause and resume at the end of file
    // that allows for stopping/starting the sketch w/o prob.
    on = true;


    //create controls for sketch
    rotate_speed = createSlider(-5,5,1,.2);
    rotate_speed.position(20,60)
    rotate_speed.parent('sketch-holder')

    btn_pause = createButton('Pause');
    btn_pause.position(20,100);
    btn_pause.mouseClicked(ptoggle);
    btn_pause.parent('sketch-holder');


    //particles for water spin
    /*
    var t =
    {
        name: "test",
        colors: ["blue",[0,255,127,127],[0,255,64,32]],
        lifetime: 600,
        angle: [330,360],
        x: 0.2,
        y: 0.1
    };
    of = new Fountain(null,t);
    */
    //TODO download correct particle lib not grafica!!!
}
function draw(){
    background(230);
    drawAxes();

    //draw text for controls
    text('Rotation Speed',20,40);

    //draw ground
  //  noStroke();

  //  rect(0,w.y+w.r,width,height);
    //draw the wheel.
    w.draw();
    //get speed from slider
    w.ang_speed = rotate_speed.value()*Math.PI/180;

    //draw particles
    /*
    of.Draw();
    of.Create();
    of.Step();
    */
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
