const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const db = require("./config/dbconfig").MongoURI;
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const port = process.env.PORT || 3000;




const express = require("express");
const app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server);

server.listen(port)


require("./config/passport")(passport);


app.use(expressLayouts);

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

app.use (
  session ({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use((__dirname + "/public", express.static("public")))

app.use("/", require("./routes"));

app.use("/account", require("./routes/account"));


console.log("App is listening on port " + port)


mongoose.connect(db, { useNewUrlParser: true })
  .then(console.log("Connected to db"));


//socket code
app.use(express.static('public'));

console.log("server is running on port: " + port);


io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection: ' + socket.id);
  socket.on("mouse", mouseMsg);
  function mouseMsg(data) {
      //emit sends the data to all users except the user that sent it
      socket.broadcast.emit("mouse", data);
      //console log the data
      console.log(data);
      // history.push(data);
      // console.log(history[1]);
      // io.socket.emit("mouse", data);  global
  }
}