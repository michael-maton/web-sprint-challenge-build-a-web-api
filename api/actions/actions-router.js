// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Actions = require("./actions-model");

const {
  validateActionId,
  validateAction,
  validateUpdatedAction,
} = require("../middleware/");

// GET
// GET
// GET
router.get("/", (req, res) => {
  Actions.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error retrieving the actions" });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

// POST
// POST
// POST
router.post("/", validateAction, (req, res) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(req.body);
    })
    .catch((error) => {
      res.status(500).json({ error: "There was an error creating the action" });
    });
});

// PUT
// PUT
// PUT
router.put("/:id", validateActionId, validateUpdatedAction, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(req.body);
    })
    .catch((error) => {
      res.status(500).json({ error: "There was an error editing the action" });
    });
});

// DELETE
// DELETE
// DELETE
router.delete("/:id", validateActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then(() => {
      res
        .status(200)
        .json({ message: `Action with id ${req.params.id} has been deleted` });
    })
    .catch((error) => {
      res.status(500).json({ error: "There was an error deleting the action" });
    });
});

module.exports = router;
