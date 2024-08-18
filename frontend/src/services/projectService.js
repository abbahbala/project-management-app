// frontend/src/services/projectService.js
import axios from 'axios';

const API_URL = '/api/projects';

const getProjects = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createProject = async (projectData) => {
  const response = await axios.post(API_URL, projectData);
  return response.data;
};

const projectService = {
  getProjects,
  createProject,
};

export default projectService;
