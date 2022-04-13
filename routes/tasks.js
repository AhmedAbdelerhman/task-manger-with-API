const Task = require('../controllers/tasks')
const express = require('express')
const isAuthriuzed = require('../midleware/authrization')
const router = express()

router.get("/tasks",isAuthriuzed,Task.getTasks)
router.get("/index.html",isAuthriuzed)

router.get("/task/:idTask",isAuthriuzed,Task.getTask)

router.post("/task",isAuthriuzed,Task.createTask)
router.patch("/task/:idTask",isAuthriuzed,Task.updatTask)

router.delete("/task/:idTask",isAuthriuzed,Task.deleteTask)
//routes


module.exports = router
