import React, { useState, useEffect } from 'react';
import './ProjectAllocationPage.css';
import ProjectList from '../components/ProjectList';
import StudentList from '../components/StudentList';
import CriteriaSelector from '../components/CriteriaSelector';
import ManualAdjustments from '../components/ManualAdjustments';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectAllocationPage = () => {
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    fetchStudents();
    fetchCriteria();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects.');
      const data = await response.json();
      setProjects(data);
      toast.success('Projects fetched successfully!');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users?role=student');
      if (!response.ok) throw new Error('Failed to fetch students.');
      const data = await response.json();
      setStudents(data);
      toast.success('Students fetched successfully!');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCriteria = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/criteria');
      if (!response.ok) throw new Error('Failed to fetch criteria.');
      const data = await response.json();
      setCriteria(data);
      toast.success('Criteria fetched successfully!');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      console.error('Error fetching criteria:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAllocate = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/allocate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projects, students, criteria }),
      });
      if (!response.ok) throw new Error('Failed to allocate projects.');
      const data = await response.json();
      setAllocations(data);
      toast.success('Projects allocated successfully!');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      console.error('Error allocating projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleManualAssign = (studentId, projectId) => {
    const updatedAllocations = allocations.filter(
      (allocation) => allocation.student._id !== studentId
    );

    const student = students.find((s) => s._id === studentId);
    const project = projects.find((p) => p._id === projectId);

    updatedAllocations.push({ student, project });
    setAllocations(updatedAllocations);
    toast.success('Manual assignment completed!');
  };

  return (
    <div>
      <ToastContainer />
      <h1>Project Allocation</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          <ProjectList projects={projects} />
          <StudentList students={students} />
          <CriteriaSelector criteria={criteria} setCriteria={setCriteria} />
          <button onClick={handleAllocate}>Allocate Projects</button>
          <ManualAdjustments
            projects={projects}
            students={students}
            onManualAssign={handleManualAssign}
          />
        </>
      )}
      <div>
        <h2>Allocation Results</h2>
        <ul>
          {allocations.map((allocation, index) => (
            <li key={index}>
              {allocation.project.title} allocated to {allocation.student.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectAllocationPage;
