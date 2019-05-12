var socket;
var rSlider, gSlider, bSlider;



function setup() {
    var canvas = createCanvas(1000, 800);
    canvas.parent('sketch-holder');
    background(240);

    socket = io.connect('http://localhost:3000');
    socket.on("mouse", newDrawing);

    rSlider = createSlider(0, 255, 255);
    rSlider.position(20, 100);
    gSlider = createSlider(0, 255, 0);
    gSlider.position(20, 130);
    bSlider = createSlider(0, 255, 0);
    bSlider.position(20, 160);

}


function newDrawing(data) {
    noStroke();
    fill(data.r,data.g,data.b);
    rect(data.x, data.y, 35, 35);
}


function mouseDragged() {
    var r = rSlider.value();
    var g = gSlider.value();
    var b = bSlider.value();
    console.log("Sending: " + mouseX + "," + mouseY + " Colour: " + r + "," + g + "," + b)

    var data = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b
    }

    socket.emit("mouse", data)

    noStroke();
    fill(r, g, b);
    rect(mouseX, mouseY, 30, 30);
}

