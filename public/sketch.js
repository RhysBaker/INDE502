var socket;

function setup() {
    createCanvas(640, 480);
    background(230);

    socket = io.connect('http://localhost:3000');
    socket.on("mouse", newDrawing);
}


function newDrawing(data) {
    noStroke();
    fill(0, 0, 255);
    ellipse(data.x, data.y, 30, 30);
}

function mouseDragged() {
    console.log("Sending: " + mouseX + "," + mouseY)

    var data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit("mouse", data)

    noStroke();
    fill(255, 0, 0);
    ellipse(mouseX, mouseY, 30, 30);
}

