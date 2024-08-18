// ProjectList.js
import React from 'react';

const ProjectList = ({ projects }) => {
  if (projects.length === 0) {
    return <p>No projects available.</p>;
  }
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;