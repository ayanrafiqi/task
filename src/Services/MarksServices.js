import axios from "axios";

export const getAllMarks = (keyword, pageNumber, cb) => {
  axios
    .get(`api/students?keyword=${keyword}&pageNumber=${pageNumber}`)
    .then(({ data }) => cb(data))
    .catch((err) => {
      console.log(err);
    });
};
