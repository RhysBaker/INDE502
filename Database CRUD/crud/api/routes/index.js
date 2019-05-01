const noteRoutes = require("./note_routes");

module.exports = function(app, client){
  noteRoutes(app, client);
};
