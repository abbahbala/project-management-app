import React, { useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import authService from '../services/authService';

const InstructorPage = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await authService.getInstructorData();
      setData(result);
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <h1>Instructor Page</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default InstructorPage;
