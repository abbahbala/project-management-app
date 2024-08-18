// backend/src/controllers/taskController.js

const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const Project = require('../models/projectModel');

// @desc    Get tasks by project ID
// @route   GET /api/tasks/:projectId
// @access  Private (Instructors and students assigned to the project)
const getTasksByProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    // Check if the user is assigned to the project (instructor or student)
    if (project.createdBy.toString() !== req.user._id.toString() && !project.students.includes(req.user._id)) {
        res.status(403);
        throw new Error('Not authorized to access tasks for this project');
    }

    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
});

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private (Instructors only)
const createTask = asyncHandler(async (req, res) => {
    const { projectId, title, description, dueDate, priority } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to add tasks to this project');
    }

    const task = new Task({
        project: projectId,
        title,
        description,
        dueDate,
        priority,
        createdBy: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private (Instructors only)
const updateTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    const project = await Project.findById(task.project);

    if (!project) {
        res.status(404);
        throw new Error('Associated project not found');
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to update tasks for this project');
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;

    const updatedTask = await task.save();
    res.json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private (Instructors only)
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    const project = await Project.findById(task.project);

    if (!project) {
        res.status(404);
        throw new Error('Associated project not found');
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to delete tasks for this project');
    }

    await task.remove();
    res.json({ message: 'Task removed' });
});

// @desc    Add an attachment to a task
// @route   POST /api/tasks/:id/attachments
// @access  Private (Instructors only)
const addAttachment = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    const project = await Project.findById(task.project);

    if (!project) {
        res.status(404);
        throw new Error('Associated project not found');
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to add attachments to this task');
    }

    task.attachments.push(req.file.path);
    await task.save();
    res.status(201).json({ message: 'Attachment added', path: req.file.path });
});

module.exports = {
    getTasksByProject,
    createTask,
    updateTask,
    deleteTask,
    addAttachment,
};
