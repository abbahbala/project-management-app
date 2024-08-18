import React, { useState } from 'react';

const ManualAdjustments = ({ projects, students, onManualAssign }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const handleAssign = () => {
    if (selectedStudent && selectedProject) {
      onManualAssign(selectedStudent, selectedProject);
      setSelectedStudent('');
      setSelectedProject('');
    } else {
      alert('Please select both a student and a project');
    }
  };

  return (
    <div className="manual-adjustments">
      <h3>Manual Adjustments</h3>
      <div>
        <label>
          Select Student:
          <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
            <option value="">--Select Student--</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Select Project:
          <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
            <option value="">--Select Project--</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleAssign}>Assign Student to Project</button>
    </div>
  );
};

export default ManualAdjustments;
