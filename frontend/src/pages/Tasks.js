import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectContext from '../context/ProjectContext';

const Tasks = () => {
  const { projectId } = useParams();
  const { tasks, loadTasks, createTask, updateTask, deleteTask } = useContext(ProjectContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    loadTasks(projectId);
  }, [loadTasks, projectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(editingTask._id, { title, description, dueDate, priority, assignedTo });
      setEditingTask(null);
    } else {
      createTask({ title, description, dueDate, priority, project: projectId, assignedTo });
    }
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
    setAssignedTo('');
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setAssignedTo(task.assignedTo);
    setEditingTask(task);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (taskId) => {
    const formData = new FormData();
    formData.append('attachment', file);

    try {
      await fetch(`/api/tasks/${taskId}/attachments`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      loadTasks(projectId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="Assigned To" />
        <button type="submit">{editingTask ? 'Update Task' : 'Create Task'}</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
            <input type="file" onChange={handleFileChange} />
            <button onClick={() => handleUpload(task._id)}>Upload</button>
            {task.attachments && task.attachments.map((file, index) => (
              <div key={index}>
                <a href={`/${file}`} target="_blank" rel="noopener noreferrer">Attachment {index + 1}</a>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
