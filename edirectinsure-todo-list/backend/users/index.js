const { Router } = require('express');
const listProjectsController = require('./controllers/listProjects');
const newProjectController = require('./controllers/newProject');
const newTaskController = require('./controllers/newTask');

const router = Router();

router.get('/:userId/projects', listProjectsController);
router.put('/:userId/projects', newProjectController);
router.put('/:userId/projects/tasks', newTaskController);

module.exports = router;
