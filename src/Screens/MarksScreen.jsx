import React, { useEffect, useState } from "react";
import {
  deleteMarks,
  getAllMarks,
  updateMarks,
} from "../Services/MarksServices";
import { Table, Button } from "react-bootstrap";

const MarksScreen = () => {
  const [marks, setMarks] = useState();

  useEffect(() => {
    const getMarks = (cb) => {
      getAllMarks(cb);
    };

    getMarks(setMarks);
  }, [marks]);

  const marksHandler = (e) => {
    e.preventDefault();
    // will display modal for creating marks
  };
  const editHandler = (e, id) => {
    e.preventDefault();

    // will display modal for editing marks
  };

  return (
    <div>
      MarksScreen
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Teacher Name</th>
            <th>Subject</th>
            <th>Total Marks</th>
            <th> Obtained Marks</th>
            <th>Exam Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!marks ? (
            <h1>Marks Sheet is Empty</h1>
          ) : (
            <>
              {marks.map((x) => (
                <tr key={x._id}>
                  <td> {x.student.name}</td>
                  <td>{x.teacher.name}</td>
                  <td>{x.subject}</td>
                  <td>{x.totalMarks}</td>
                  <td>{x.obtainedMarks}</td>
                  <td>{x.examDate}</td>
                  <td>
                    <Button
                      type="submit"
                      onClick={() => {
                        deleteMarks(x._id);
                      }}
                    >
                      Delete Marks
                    </Button>
                    <Button type="submit" onClick={() => editHandler(x.id)}>
                      Edit Marks
                    </Button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </Table>
      <Button type="submit" onClick={marksHandler}>
        Create Marks
      </Button>
    </div>
  );
};

export default MarksScreen;
