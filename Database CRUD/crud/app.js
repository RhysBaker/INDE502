const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const dbConfig = require("./config/db.js");
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(dbConfig.url, (err, client) => {
  if (err) return console.log(err);
  require("./api/routes")(app, client);

  app.listen(port, ()=>{
    console.log("listening on port:" + port);
  });
});


app.get("/", (req, res) => {
  res.send("Hello world")
});
