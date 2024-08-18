// frontend/src/pages/Projects.js
import React, { useContext, useEffect, useState } from 'react';
import ProjectContext from '../context/ProjectContext';

const Projects = () => {
  const { projects, loadProjects, createProject } = useContext(ProjectContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [course, setCourse] = useState('');

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject({ title, description, deadline, course });
  };

  return (
    <div>
      <h1>Projects</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" />
        <button type="submit">Create Project</button>
      </form>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
