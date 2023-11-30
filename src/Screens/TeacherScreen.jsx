import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import {
  createTeacher,
  getAllTeachers,
  deleteTeacher,
  updateTeacher,
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
      const data = await getAllTeachers(searchKeyword, page);
      setTeachers(data.teachers);
      setPages(data.pages);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [page, searchKeyword]);

  const addTeacher = async () => {
    try {
      await createTeacher({ name, subjects });
      fetchTeachers();
      handleClose();
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const deleteTeacherHandler = async (id) => {
    try {
      await deleteTeacher(id);
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
          {/* Modal content for adding/updating teachers */}
          {/* ...Form inputs and buttons for adding/updating */}
        </Modal>
      </div>
      <div>
        <h3>Teacher List</h3>
        <Table striped bordered hover>
          {/* Table headers */}
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
