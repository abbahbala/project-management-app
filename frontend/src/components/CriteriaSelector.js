import React from 'react';

const CriteriaSelector = ({ criteria, setCriteria }) => {
  const handleChange = (index, value) => {
    if (value.trim() === '') {
      alert('Criteria cannot be empty');
      return;
    }
    const newCriteria = [...criteria];
    newCriteria[index] = value;
    setCriteria(newCriteria);
  };

  return (
    <div>
      <h2>Criteria</h2>
      <ul>
        {criteria.map((criterion, index) => (
          <li key={index}>
            <input
              type="text"
              value={criterion}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CriteriaSelector;
