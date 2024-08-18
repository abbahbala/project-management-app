// backend/src/controllers/projectController.js

const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Instructor only)
const createProject = asyncHandler(async (req, res) => {
    const { title, description, deadline, course } = req.body;

    const project = new Project({
        title,
        description,
        deadline,
        course,
        createdBy: req.user._id,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private (Instructor only)
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({ createdBy: req.user._id });
    res.json(projects);
});

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Private (Instructor only)
const getProjectById = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        if (project.createdBy.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to access this project');
        }
        res.json(project);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Instructor only)
const updateProject = asyncHandler(async (req, res) => {
    const { title, description, deadline, course } = req.body;

    const project = await Project.findById(req.params.id);

    if (project) {
        if (project.createdBy.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to update this project');
        }

        project.title = title || project.title;
        project.description = description || project.description;
        project.deadline = deadline || project.deadline;
        project.course = course || project.course;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Instructor only)
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        if (project.createdBy.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to delete this project');
        }

        await project.remove();
        res.json({ message: 'Project removed' });
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
