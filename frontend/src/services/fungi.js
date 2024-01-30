import axios from "axios";

const getAll = async () => {
  try {
    const res = await axios.get("http://localhost:9000/api/fungi");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getOneById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/fungi/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const addNew = async (data) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/fungi`, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const updateOne = async (data, id) => {
  try {
    const res = await axios.put(`http://localhost:9000/api/fungi/${id}`, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteOne = async (id) => {
  try {
    await axios.delete(`http://localhost:9000/api/fungi/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export default { getAll, getOneById, addNew, updateOne, deleteOne };
