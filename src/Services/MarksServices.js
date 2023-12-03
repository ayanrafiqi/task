import axios from "axios";

export const getAllMarks = (keyword, pageNumber, cb) => {
  axios
    .get(`api/students?keyword=${keyword}&pageNumber=${pageNumber}`)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};

export const getMarks = (id, cb) => {
  axios
    .patch(`/api/marks/${id}`)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};

export const updateMarks = (id, data, cb) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .put(`/api/marks/${id}`, data, config)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};

export const deleteMarks = (id, cb) => {
  axios
    .delete(`/api/marks/${id}`)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};
