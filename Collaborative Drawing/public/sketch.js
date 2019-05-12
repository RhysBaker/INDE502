var socket;
var rSlider, gSlider, bSlider;


//set up canvas bind it to div, setup socket connections and create rgb sliders
function setup() {
    var canvas = createCanvas(1000, 800);
    canvas.parent('sketch-holder');
    background(240);

    socket = io.connect('http://localhost:3000');
    socket.on("mouse", newDrawing);

    //create slider min and max values and current value
    rSlider = createSlider(0, 255, 255);
    //set position of the slider
    rSlider.position(20, 140);
    gSlider = createSlider(0, 255, 0);
    gSlider.position(20, 170);
    bSlider = createSlider(0, 255, 0);
    bSlider.position(20, 200);

}



//data that gets sent from socket is handled here
function newDrawing(data) {
    noStroke();
    //takes the data for colour and position from socket
    fill(data.r,data.g,data.b);
    rect(data.x, data.y, 35, 35);
}


function mouseDragged() {
    //set slider values to variables to assign them to colour
    var r = rSlider.value();
    var g = gSlider.value();
    var b = bSlider.value();
    //console log mouse position and colour
    console.log("Sending: " + mouseX + "," + mouseY + " Colour: " + r + "," + g + "," + b)


    //data that the socket is going to get sent and what we want them to be called
    var data = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b
    }


    //send socket data
    socket.emit("mouse", data)


    //draw when the user drags the mouse// possibly changed to click if grid is set up
    noStroke();
    fill(r, g, b);
    rect(mouseX, mouseY, 30, 30);
}



//function that allows the user to save a screenshot of the canvas
function keyTyped() {
    //if the user hits the p key they will be prompted to enter a file name
    if (key === 'p') {
        var fileName = prompt("Please enter screenshot name");
        //if they enter a file name it will save a jpg image of the canvas
        if(fileName != "") {
            saveCanvas(canvas, fileName, 'jpg');
        } else {
            //if no file name is entered it will alert the user to try again
             alert("sorry you didnt enter a screenshot name, try again")
        }
    }
  }

