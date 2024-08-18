import axios from 'axios';

const API_URL = '/api/users/';

const getConfig = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };
};

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
  }
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get instructor-only data (example)
const getInstructorData = async () => {
  const response = await axios.get(API_URL + 'instructor', getConfig());
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getInstructorData
};

export default authService;
