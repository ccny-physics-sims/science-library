// General utilities and etc


// touch utilities
// TODO: NEED TO CHECK ON IOS
var somethingIsDragging;

// these functions are defined in p5.dom
function touchStarted() {
    ellipse(mouseX, mouseY, 5, 5);
    somethingIsDragging = true;
    // prevent default
    return false;
}

function touchMoved() {
    ellipse(mouseX, mouseY, 5, 5);
    somethingIsDragging = true;
    // prevent default
    return false;
}

function touchEnded() {
    ellipse(mouseX, mouseY, 5, 5);
    somethingIsDragging = false;
    // prevent default
    return false;
}

// TODO - figure out namespace/scoping before building out further

// responsive utilities
//p5 function that resizes the canvas when a window resize is detected
// function windowResized() {
// resizeCanvas(windowWidth, windowHeight);
// }

// debugging utilies
// be nice to have a toggle where setting to true displays many infos at once
// eg, for FPS: text("FPS: " +  frameRate().toFixed(2), 10, height - 10);
