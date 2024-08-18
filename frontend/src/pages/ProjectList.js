// frontend/src/pages/ProjectList.js
import React, { useContext, useEffect } from 'react';
import ProjectContext from '../context/ProjectContext';

const ProjectList = () => {
  const { projects, getProjects } = useContext(ProjectContext);

  useEffect(() => {
    // Assume token is available in localStorage or context
    const token = localStorage.getItem('token');
    getProjects(token);
  }, [getProjects]);

  return (
    <div>
      <h1>Projects</h1>
      {projects.map((project) => (
        <div key={project._id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
