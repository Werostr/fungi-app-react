import axios from "axios";
import { useNavigate } from "react-router-dom";

const getToken = () => {
  return window.localStorage.getItem("user-token");
};

const handleError = (err) => {
  console.log(err);
  if (err.response && err.response.status === 403) {
    return "Forbidden";
  } else if (err.response && err.response.status === 401) {
    return "Unauthorized";
  }
};

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
    const token = getToken();

    const res = await axios.post(`http://localhost:9000/api/fungi`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

const updateOne = async (data, id) => {
  try {
    const token = getToken();
    const res = await axios.put(`http://localhost:9000/api/fungi/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

const deleteOne = async (id) => {
  try {
    const token = getToken();
    const res = await axios.delete(`http://localhost:9000/api/fungi/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export default { getAll, getOneById, addNew, updateOne, deleteOne };
