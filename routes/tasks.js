const Task = require('../controllers/tasks')
const express = require('express')

const router = express()

router.get("/tasks",Task.getTasks)
router.get("/task/:idTask",Task.getTask)

router.post("/task",Task.createTask)
router.patch("/task/:idTask",Task.updatTask)

router.delete("/task/:idTask",Task.deleteTask)



module.exports = router