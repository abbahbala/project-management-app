// backend/tests/allocation.test.js
const { allocateProjects } = require('../src/controllers/allocationController');
const Project = require('../src/models/projectModel');
const User = require('../src/models/userModel');
const AllocationCriteria = require('../src/models/allocationCriteriaModel');

jest.mock('../src/models/projectModel');
jest.mock('../src/models/userModel');
jest.mock('../src/models/allocationCriteriaModel');

describe('Project Allocation Algorithm', () => {
  it('should allocate projects based on criteria', async () => {
    Project.find.mockResolvedValue([
      { title: 'Project 1' },
      { title: 'Project 2' },
    ]);

    User.find.mockResolvedValue([
      { name: 'Student 1', skills: ['skill1'], availability: 5, pastPerformance: 3 },
      { name: 'Student 2', skills: ['skill1'], availability: 3, pastPerformance: 4 },
    ]);

    AllocationCriteria.find.mockResolvedValue([
      { skill: 'skill1', availability: 1, pastPerformance: 2 },
    ]);

    // Mock req and res objects
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Call allocateProjects with mocked req and res
    await allocateProjects(req, res);

    // Verify response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { project: { title: 'Project 1' }, student: { name: 'Student 1', skills: ['skill1'], availability: 5, pastPerformance: 3 } },
      { project: { title: 'Project 2' }, student: { name: 'Student 2', skills: ['skill1'], availability: 3, pastPerformance: 4 } },
    ]);
  });

  // Add more test cases here
});
