const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the tasks  using get : /api/notes/fetchallnotes 
router.get('/fetchalltasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error' });
    }
})



//ROUTE 2: Create a new task using post : /api/task/createtask 
router.post('/createtask', [
    body('title').notEmpty().withMessage('Title is required.').escape(),
    body('description').notEmpty().withMessage('Description is required.').escape(),
    body('status').notEmpty().withMessage('Status is required.').escape(),
], async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }
        const task = new Task({
            title, description, status
        })
        const savedTask = await task.save()
        res.json(savedTask)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error' });
    }
})

//ROUTE 3: Update an existing task using PUT : /api/task/updatetask 
router.put('/updatetask/:id', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newTask = {};
        if (title) { newTask.title = title }
        if (description) { newTask.description = description }
        if (status) { newTask.status = status }

        //Find the note to update and update it
        let task = await Task.findById(req.params.id)
        if (!task) { return res.status(404).send("Not found") }

        task = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true })
        res.json({ task })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error' });
    }
})

//ROUTE 4: Delete an existing task using DELETE : /api/task/deletenote     
router.delete('/deletetask/:id', async (req, res) => {
    //Find the task to delete ande delete it
    try {
        let task = await Task.findById(req.params.id)
        if (!task) { return res.status(404).send("Not found") }

        task = await Task.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Deleted", task: task })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error' });
    }
})



module.exports = router;