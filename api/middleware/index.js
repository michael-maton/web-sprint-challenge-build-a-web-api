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

async function validateActionId(req, res, next) {
  console.log("checking action id");
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      req.action = action;
      console.log(`Action id ${req.params.id} found`);
      next();
    } else {
      console.log(`Action with id ${req.params.id} not found`);
      res.status(404).json(`Action with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json("error");
  }
}

function validateAction(req, res, next) {
  console.log("Validating action fields");
  const { project_id, description, notes } = req.body;
  project_id && description && notes
    ? next()
    : res.status(400).json({ error: "Please fill out required fields" });
}

function validateUpdatedAction(req, res, next) {
  console.log("Validating action fields");
  const { completed, project_id, description, notes } = req.body;
  project_id || description || notes || completed
    ? next()
    : res.status(400).json({ error: "Please fill out required field(s)" });
}

async function validateProjectId(req, res, next) {
  console.log("checking project id");
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      console.log(`Project id ${req.params.id} found`);
      next();
    } else {
      console.log(`Projects with id ${req.params.id} not found`);
      res.status(404).json(`Projects with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json("error");
  }
}

function validateProject(req, res, next) {
  console.log("Validating project fields");
  const { name, description } = req.body;
  description && name
    ? next()
    : res.status(400).json({ error: "Please fill out required fields" });
}

function validateUpdatedProject(req, res, next) {
  console.log("Validating project fields");
  const { name, description, completed } = req.body;
  description || name || completed
    ? next()
    : res.status(400).json({ error: "Please fill out required fields" });
}

module.exports = {
  logger,
  validateActionId,
  validateAction,
  validateUpdatedAction,
  validateProjectId,
  validateProject,
  validateUpdatedProject,
};
