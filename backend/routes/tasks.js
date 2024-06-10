const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth'); // Ensuring authentication middleware is used

// POST /tasks - Create a new task
router.post('/', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        user: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET /tasks - Get all tasks for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET /tasks/:id - Get a specific task by ID
router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, user: req.user._id });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PATCH /tasks/:id - Update a specific task
router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['_id',         'title',
    'description', 'dueDate',
    'priority',    'category',
    'isCompleted', 'user',
    '__v'];
    // refactor needed
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    console.log(updates)
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE /tasks/:id - Delete a specific task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
