import axios from "axios";

export const createTeacher = (model) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post("/api/teachers", model, config)
    .then(({ data }) => console.log(data))
    .catch((err) => {
      console.log(err);
    });
};

export const getAllTeachers = (keyword, pageNumber, cb) => {
  axios
    .get(`api/teachers?keyword=${keyword}&pageNumber=${pageNumber}`)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};

export const getTeacher = (id, cb) => {
  axios
    .patch(`/api/teachers/${id}`)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTeacher = (id, cb) => {
  axios
    .delete(`/api/teachers/${id}`)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};

export const updateTeacher = (id, data, cb) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .patch(`/api/teachers/${id}`, data, config)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};
