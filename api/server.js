const express = require('express');
const server = express();
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");
const { logger } = require("./middleware/");

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json());
server.use("/api/actions", logger, actionsRouter);
server.use("/api/projects", logger, projectsRouter);

server.get('/', (req, res) => {
    res.send(`Test test 123`);
  });

module.exports = server;
