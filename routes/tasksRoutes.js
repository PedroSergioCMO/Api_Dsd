var express = require('express');
var router = express.Router();
let controller = require('../controllers/taskController');
const task_validator = require('../validator/task_validator');

router.get('/ping', (req, res)=>{
    res.json({ resposta: true })
})

/* GET users listing. */
router.get('/', task_validator.manipulateTask ,controller.getAllTasks);
router.get('/:titulo', task_validator.manipulateTask ,controller.getTask);
router.post('/', task_validator.manipulateTask ,controller.addTask);
router.put('/:taskId', task_validator.manipulateTask ,controller.editTask);
router.delete('/:titulo', task_validator.manipulateTask ,controller.deleteTask);

module.exports = router;
