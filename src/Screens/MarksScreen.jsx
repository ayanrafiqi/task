import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getAllMarks } from "../Services/MarksServices"; // Import your Marks service functions

const MarksScreen = () => {
  const [selectedStudents, setSelectedStudents] = useState([]); // To store selected students
  const [marksData, setMarksData] = useState([]); // To store marks data for selected students

  const fetchMarks = async () => {
    // Fetch marks data when selected students change
    const studentIds = selectedStudents.map((student) => student.id).join(",");
    try {
      const marks = await getAllMarks(studentIds); // Fetch marks data for selected students
      setMarksData(marks); // Set marks data to state
    } catch (error) {
      console.error("Error fetching marks:", error);
    }
  };

  useEffect(() => {
    fetchMarks(); // Fetch marks data when selected students change
  }, [selectedStudents]);

  // Render function to display marks data
  const renderMarksData = () => {
    if (marksData.length === 0) {
      return <p>No marks data available.</p>;
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Teacher</th>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {marksData.map((mark) => (
            <tr key={mark.id}>
              <td>{mark.studentId}</td>
              <td>{mark.name}</td>
              <td>{mark.std}</td>
              <td>{mark.teacher}</td>
              <td>{mark.subject}</td>
              <td>{mark.marks}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div className="container">
      <h2>Marks Screen</h2>

      <div>
        <h3>Selected Students:</h3>
        <ul>
          {selectedStudents.map((student) => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Marks Details:</h3>
        {renderMarksData()}
      </div>
    </div>
  );
};

export default MarksScreen;
