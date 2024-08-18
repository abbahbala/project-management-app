// backend/src/controllers/allocationController.js

const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');
const User = require('../models/userModel');
const AllocationCriteria = require('../models/allocationCriteriaModel');

// @desc    Allocate projects to students based on criteria
// @route   POST /api/allocate
// @access  Private (Instructors only)
const allocateProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find();
    const students = await User.find({ role: 'student' });
    const criteria = await AllocationCriteria.find();

    if (!projects.length || !students.length) {
        res.status(400);
        throw new Error('Projects or students data not found for allocation');
    }

    const allocationResults = [];
    let availableStudents = [...students]; // Clone the student array for allocation

    projects.forEach((project) => {
        // Try to find a student that matches all criteria
        const allocatedStudent = availableStudents.find(s => {
            return criteria.every(c => {
                return (
                    s.skills.includes(c.skill) &&
                    s.availability >= c.availability &&
                    s.pastPerformance >= c.pastPerformance
                );
            });
        });

        // If no student matches, fallback to the first available student
        const studentToAllocate = allocatedStudent || availableStudents[0];

        // Remove the allocated student from the available list
        availableStudents = availableStudents.filter(s => s !== studentToAllocate);

        allocationResults.push({
            project,
            student: studentToAllocate,
        });
    });

    res.status(200).json(allocationResults);
});

module.exports = {
    allocateProjects,
};
