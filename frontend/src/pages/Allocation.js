import React, { useState, useContext } from 'react';
import ProjectContext from '../context/ProjectContext';

const Allocation = () => {
  const { allocateProjects, allocations } = useContext(ProjectContext);
  const [loading, setLoading] = useState(false);

  const handleAllocate = async () => {
    setLoading(true);
    await allocateProjects();
    setLoading(false);
  };

  return (
    <div>
      <h1>Project Allocation</h1>
      <button onClick={handleAllocate} disabled={loading}>
        {loading ? 'Allocating...' : 'Allocate Projects'}
      </button>
      <div>
        {allocations.map((allocation, index) => (
          <div key={index}>
            <p>Project: {allocation.project.title}</p>
            <p>Assigned to: {allocation.student.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allocation;
