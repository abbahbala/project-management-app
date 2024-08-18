import React, { createContext, useState } from 'react';
import projectService from '../services/projectService';
import taskService from '../services/taskService';
import allocationService from '../services/allocationService';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [allocations, setAllocations] = useState([]);

  const loadProjects = async () => {
    const data = await projectService.getProjects();
    setProjects(data);
  };

  const createProject = async (projectData) => {
    const data = await projectService.createProject(projectData);
    setProjects([...projects, data]);
  };

  const loadTasks = async (projectId) => {
    const data = await taskService.getTasksByProject(projectId);
    setTasks(data);
  };

  const createTask = async (taskData) => {
    const data = await taskService.createTask(taskData);
    setTasks([...tasks, data]);
  };

  const updateTask = async (taskId, taskData) => {
    const data = await taskService.updateTask(taskId, taskData);
    setTasks(tasks.map((task) => (task._id === taskId ? data : task)));
  };

  const deleteTask = async (taskId) => {
    await taskService.deleteTask(taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const addAttachment = async (taskId, formData) => {
    await taskService.addAttachment(taskId, formData);
    loadTasks();
  };

  const allocateProjects = async () => {
    const data = await allocationService.allocateProjects();
    setAllocations(data);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loadProjects,
        createProject,
        tasks,
        loadTasks,
        createTask,
        updateTask,
        deleteTask,
        addAttachment,
        allocations,
        allocateProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
