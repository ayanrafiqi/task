import axios from "axios";

export const createStudent = (model, cb) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post("/api/students", model, config)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};

export const getAllStudents = (keyword, pageNumber, cb) => {
  axios
    .get(`api/students?keyword=${keyword}&pageNumber=${pageNumber}`)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};

export const getStudent = (id, cb) => {
  axios
    .patch(`/api/students/${id}`)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};

export const updateStudent = (id, data, cb) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .put(`/api/students/${id}`, data, config)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};

export const deleteStudent = (id, cb) => {
  axios
    .delete(`/api/teachers/${id}`)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};
