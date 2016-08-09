// experimenting with the E and M lib.

function setup(){
    createCanvas(640,480);
    frameRate(8);

    //sliders
    rslider = createSlider(1,40,20,1);
    rslider.position(20,140);

    //code to manage the adding of charges.
    valman = -100;
    b = createButton('Add a charge');
    b.position(20,20);
    b.mousePressed(function(){v.addCharge(200,200,valman); valman*=-1;});

    v = new field2();
    v.addCharge();
    // "on" is used for the pause and resume at the end of file
    // that allows for stopping/starting the sketch w/o prob.
    on = true;
}
function draw(){
    background(255);
    
    v.setRes(rslider.value());
    v.draw();

    text('Resolution: ', 20, 120);
}
function mouseDragged(){
    //code to manage the draggability of charges. 
    //NOTE: only the last charge created is draggable.
    if(v.objects.length > 1){
        v.dragCheck();
    }
    //disabled for now...
    if(on == true){
        on = false;
        //noLoop();
    }
    else{
        on = true;
        //loop();
    }
}
