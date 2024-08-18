import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path to your AuthContext

const PrivateRoute = ({ element: Component, roles = [], ...rest }) => {
  const { user } = useAuth(); // Assuming you have user data in context
  const location = useLocation();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length && !roles.includes(user.role)) {
    // User doesn't have required role
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Authorized
  return Component;
};

export default PrivateRoute;
