import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import {
  createTeacher,
  getAllTeachers,
  deleteTeacher,
  updateTeacher,
  getTeacher,
} from "../Services/TeacherServices";

const TeacherComponent = () => {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setSelectedTeacher(null);
    clearForm();
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const clearForm = () => {
    setName("");
    setSubjects("");
  };

  const fetchTeachers = async () => {
    try {
      getAllTeachers(searchKeyword, page, setTeachers);
      setPages(teachers.pages);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [page, searchKeyword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "subjects") {
      setSubjects(value);
    }
  };

  const handleSubmit = () => {
    if (selectedTeacher) {
      updateTeacherHandler();
    } else {
      addTeacher();
    }
  };

  const addTeacher = async () => {
    try {
      createTeacher({ name, subjects });
      fetchTeachers();
      handleClose();
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const deleteTeacherHandler = async (id) => {
    try {
      deleteTeacher(id);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const updateTeacherHandler = async () => {
    try {
      await updateTeacher(selectedTeacher._id, { name, subjects });
      fetchTeachers();
      handleClose();
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setName(teacher.name);
    setSubjects(teacher.subjects);
    handleShow();
  };

  return (
    <div>
      <h2>Teachers</h2>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Add Teacher
        </Button>
        <Form.Group controlId="searchKeyword">
          <Form.Control
            type="text"
            placeholder="Enter name to search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Button variant="primary" onClick={() => setPage(1)}>
            Search
          </Button>
        </Form.Group>
      </div>
      <div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedTeacher ? "Edit Teacher" : "Create Teacher"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formSubjects">
                <Form.Label>Subjects</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subjects separated by commas"
                  name="subjects"
                  value={subjects}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {selectedTeacher ? "Save Changes" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <h3>Teacher List</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Teacher Id</th>
              <th> Teacher Name </th>
              <th>Subject Assigned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{teacher.subjects}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEdit(teacher)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteTeacherHandler(teacher._id)}
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

export default TeacherComponent;
