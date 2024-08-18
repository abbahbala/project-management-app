import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import PrivateRoute from './components/PrivateRoute';
import InstructorDashboard from './pages/InstructorDashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Allocation from './pages/Allocation';
import ProjectAllocationPage from './pages/ProjectAllocationPage'; // Adjust the path if necessary

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/allocation" element={<PrivateRoute element={<Allocation />} />} />
              <Route path="/allocate" element={<PrivateRoute element={<ProjectAllocationPage />} />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
              <Route path="/projects" element={<PrivateRoute element={<Projects />} />} />
              <Route path="/projects/:projectId/tasks" element={<PrivateRoute element={<Tasks />} />} />
              <Route path="/instructor-dashboard" element={<PrivateRoute element={<InstructorDashboard />} roles={['instructor']} />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
