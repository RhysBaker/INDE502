var socket;
var r = (255, 0, 0);
var g = (0, 255, 0);
var b = (0, 0, 255);


function setup() {
    createCanvas(640, 480);
    background(230);

    socket = io.connect('http://localhost:3000');
    socket.on("mouse", newDrawing);
}


function newDrawing(data) {
    noStroke();
    fill(r, g, b);
    rect(data.x, data.y, 35, 35);
}


function mouseDragged() {
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
    fill(255, 0, 0);
    rect(mouseX, mouseY, 30, 30);
}
