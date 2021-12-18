const express = require('express');
const app = express();
const bodyparser = require('body-parser');

//Load Middleware
app.use(bodyparser.json());

//Load in mongoose models
const { List, Task, mongoose } = require('./db/models/index');

////////////////////////////////////////////////////////////////////////////////
/* Route Handlers */

/* List Route Paths */

/* 
 * GET /lists
 * Purpose : Get all lists
 */
app.get('/lists', (req, res) => {
    List.find({}).then(lists => {
        res.send(lists);
    });
});

/* 
 * POST /lists
 * Purpose : Create a new list
 */
app.post('/lists', (req, res) => {
    let title = req.body.title;
    let newlist = new List({
        title
    });
    newlist.save().then((listdoc) => {
        res.send(listdoc);
    })
});

/* 
 * PATCH /lists:id
 * Purpose : Update a specified list
 */
app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

/* 
 * DELETE /lists
 * Purpose : Delete a specified list
 */
app.delete('/lists/:id', (req, res) => {
    List.findOneAndRemove({ _id: req.params.id }).then(removedList => {
        res.send(removedList);
    });
});

/* 
 * GET /lists
 * Purpose : Get all lists
 */
app.get('/lists/:id', (req, res) => {
    List.findOne({ _id: req.params.id }).then(lists => {
        res.send(lists);
    });
});




///////////////////////////////////////////////////////////////////////////////////
/* Task Route Paths */

/* 
 * GET /lists/id/tasks
 * Purpose : Get all Tasks from a specified list
 */
app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({ _listId: req.params.listId }).then(tasks => {
        res.send(tasks);
    });
})

/* 
 * POST /lists/id/tasks
 * Purpose : Create a new Task in the specified list
 */
app.post('/lists/:listId/tasks', (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    })
    newTask.save().then(newtaskdoc => {
        res.send(newtaskdoc);
    });
});

/* 
 * PATCH /lists/id/tasks/taskid
 * Purpose : Updates a Task in the specified list 
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({ 
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

/* 
 * DELETE /lists/id/tasks/taskid
 * Purpose : deletes a task from a specified list
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedtask) => {
        res.send(removedtask);
    });
});

/* 
 * GET /lists/listid/tasks/taskid
 * Purpose : Get specified Task from a specified list
 */
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    });
});

/* Port to run on */
app.listen(3000, () => {
    console.log("Node is listening")
});