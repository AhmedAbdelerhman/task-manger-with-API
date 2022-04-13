const Task = require("../modules/tasks");

exports.getTasks = (req, res, next) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json({ tasks: tasks });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createTask = (req, res, next) => {
  Task.create(req.body)
    .then((task) => {
      console.log(task);
      res.status(201).json({ task: task });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.updatTask = (req, res, next) => {
    const idTask = req.params.idTask;
    Task.findById({_id:idTask}).then(task => {

       task.name = req.body.name,
       task.completed = req.body.completed
       task.save().then(task => {

      return  res.status(200).json({ message : "updated" , task:task});
        })
   

     })
     .catch(err => {
    console.log(err);
     });
      
  };
  

  exports.getTask = (req, res, next) => {
    const idTask = req.params.idTask;
    Task.findById(idTask)
      .then((task) => {
        console.log(task);
        res.status(200).json({ message : "one task" , task:task});
      })
      .catch((err) => {
        console.log(err);
      });
  };

exports.deleteTask = (req, res, next) => {
  const idTask = req.params.idTask;
  Task.findByIdAndRemove(idTask)
    .then((task) => {
      console.log(task);
      res.status(200).json({ message : "deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};
