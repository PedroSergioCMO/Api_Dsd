var express = require('express');
var router = express.Router();
let controller = require('../controllers/taskController')

/* GET users listing. */
router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTaskByid);
router.post('/', controller.addTask);
router.put('/:id', controller.editTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
