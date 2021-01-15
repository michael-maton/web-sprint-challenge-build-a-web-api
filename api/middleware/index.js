const Actions = require("../actions/actions-model");
const Projects = require("../projects/projects-model");

function logger(req, res, next) {
  console.log("Method: ", req.method);
  console.log("Path: ", req.originalUrl);
  var timestamp = Number(new Date());
  var date = new Date(timestamp).toDateString();
  console.log("Timestamp: ", date);
  next();
}

module.exports = { logger };
