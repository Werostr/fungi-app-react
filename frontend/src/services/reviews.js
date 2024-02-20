import axios from "axios";

const addNew = async (id, data) => {
  try {
    const res = await axios.post(
      `http://localhost:9000/api/fungi/${id}/reviews`,
      data
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteOne = async (id, reviewId) => {
  try {
    const res = await axios.delete(
      `http://localhost:9000/api/fungi/${id}/reviews/${reviewId}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default { addNew, deleteOne };
