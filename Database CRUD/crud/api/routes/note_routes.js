var ObjectID = require("mongodb").ObjectID;


module.exports = (app, client)=>{
  app.post("/notes", (req, res)=>{
    var db = client.db("crudapi");
    const note = { text: req.body.body, title: req.body.body };
    db.collection("notes").insert(note, (err, result) =>{
      if (err) {
        res.send({"Error": "an error has occured"});
      } else {
        res.send(result.ops[0]);
      };
    });
  });

  app.get("/notes/:id", (req, res)=>{
    var db = client.db("crudapi");
    const id = req.params.id;
    const details = { "_id": new ObjectID(id) };
    db.collection("notes").findOne(details, (err, item) => {
      if (err) {
        res.send({"error": "an error has occured"});
      }else {
        res.send(item)
      }
    });
  });

  app.put("/notes/:id", (req, res)=>{
    var db = client.db("crudapi");
    const id = req.params.id;
    const details = { "_id": new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.body };
    db.collection("notes").update(details, note, (err, item) => {
      if (err) {
        res.send({"error": "an error has occured"});
      }else {
        res.send(item)
      }
    });
  });

  app.delete("/notes/:id", (req, res)=>{
    var db = client.db("crudapi");
    const id = req.params.id;
    const details = { "_id": new ObjectID(id) };
    db.collection("notes").remove(details, (err, item) => {
      if (err) {
        res.send({"error": "an error has occured"});
      }else {
        res.send("note " + id + " deleted")
      }
    });
  });

}; //end of module.exports
