import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  getAllStudents,
  getStudent,
  deleteStudent,
  updateStudent,
  createStudent,
} from "../Services/StudentServices";

const StudentComponent = () => {
  const params = useParams();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [std, setStd] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const keyword = params.keyword;

  const handleClose = () => {
    setShowModal(false);
    setSelectedStudent(null);
    clearForm();
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const clearForm = () => {
    setName("");
    setStudentId("");
    setStd("");
  };

  const fetchStudents = async () => {
    try {
      const data = getAllStudents(keyword, page, setStudents);
      setPages(data.pages);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const addStudent = async () => {
    try {
      createStudent({ name, studentId, std }, setStudents);
      handleClose();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const updateStudentHandler = async () => {
    try {
      updateStudent(selectedStudent._id, { name, studentId, std });

      const updatedStudents = students.map((student) =>
        student._id === selectedStudent._id
          ? { ...student, name, studentId, std }
          : student
      );
      setStudents(updatedStudents);
      handleClose();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const deleteStudentHandler = async (id) => {
    try {
      deleteStudent(id);
      const updatedStudents = students.filter((student) => student._id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleEditHandler = (student) => {
    setSelectedStudent(student);
    setName(student.name);
    setStudentId(student.studentId);
    setStd(student.std);
    handleShow();
  };

  return (
    <div>
      <h2>Students</h2>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Add Student
        </Button>
      </div>
      <div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedStudent ? "Edit Student" : "Add Student"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="studentId">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="std">
                <Form.Label>Class</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Class"
                  value={std}
                  onChange={(e) => setStd(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={selectedStudent ? updateStudentHandler : addStudent}
            >
              {selectedStudent ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <h3>Student List</h3>
        <Table striped bordered hover>
          {/* Table headers */}
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.studentId}</td>
                <td>{student.std}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleEditHandler(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteStudentHandler(student._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          {[...Array(pages).keys()].map((pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              active={pageNumber + 1 === page}
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default StudentComponent;
