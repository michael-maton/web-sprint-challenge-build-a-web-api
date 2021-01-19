// Write your "projects" router here!
// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("./projects-model");
const {
  validateProjectId,
  validateProject,
  validateUpdatedProject,
} = require("../middleware/");

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

// POST
// POST
// POST
router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(req.body);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error creating the project" });
    });
});

// PUT
// PUT
// PUT
router.put("/:id", validateProjectId, validateUpdatedProject, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(req.body);
    })
    .catch((error) => {
      res.status(500).json({ error: "There was an error editing the project" });
    });
});

// DELETE
// DELETE
// DELETE
router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then(() => {
      res
        .status(200)
        .json({ message: `Project with id ${req.params.id} has been deleted` });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error deleting the project" });
    });
});

module.exports = router;
