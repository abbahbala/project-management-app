// frontend/src/context/TaskContext.js
import { createContext, useReducer } from 'react';
import taskService from '../services/taskService';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'CREATE_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
  });

  const getTasks = async (projectId, token) => {
    const tasks = await taskService.getTasks(projectId, token);
    dispatch({ type: 'GET_TASKS', payload: tasks });
  };

  const createTask = async (taskData, token) => {
    const task = await taskService.createTask(taskData, token);
    dispatch({ type: 'CREATE_TASK', payload: task });
  };

  return (
    <TaskContext.Provider value={{ ...state, getTasks, createTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
