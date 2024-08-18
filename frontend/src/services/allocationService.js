const allocateProjects = async () => {
    const response = await fetch('/api/allocations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    return data;
  };
  
  const allocationService = {
    allocateProjects,
    // other functions
  };
  
  export default allocationService;
  
  