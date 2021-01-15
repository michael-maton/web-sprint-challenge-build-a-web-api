// Write your "projects" router here!
// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("./projects-model");
const { validateProjectId } = require("../middleware/");

// GET
// GET
// GET
router.get("/", (req, res) => {
    Projects.get()
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "There was an error retrieving the projects" });
      });
  });
  
  router.get("/:id", validateProjectId, (req, res) => {
    res.status(200).json(req.project);
  });
  
  router.get("/:id/actions", validateProjectId, (req, res) => {
    res.status(200).json(req.project.actions);
  });

module.exports = router;
