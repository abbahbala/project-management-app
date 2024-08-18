// StudentList.js
import React from 'react';

const StudentList = ({ students }) => {
  if (students.length === 0) {
    return <p>No students available.</p>;
  }
  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;