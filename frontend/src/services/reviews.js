import axios from "axios";

const getToken = () => {
  return window.localStorage.getItem("user-token");
};

const handleError = (err) => {
  console.log(err);
  if (err.response && err.response.status === 403) {
    return { savedReview: "Forbidden", average: 0 };
  } else if (err.response && err.response.status === 401) {
    return { savedReview: "Unauthorized", average: 0 };
  }
};

const handleError2 = (err) => {
  console.log(err);
  if (err.response && err.response.status === 403) {
    return "Forbidden";
  } else if (err.response && err.response.status === 401) {
    return "Unauthorized";
  }
};

const addNew = async (id, data) => {
  try {
    const token = getToken();
    const res = await axios.post(
      `http://localhost:9000/api/fungi/${id}/reviews`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

const deleteOne = async (id, reviewId) => {
  try {
    const token = getToken();
    const res = await axios.delete(
      `http://localhost:9000/api/fungi/${id}/reviews/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return handleError2(err);
  }
};

export default { addNew, deleteOne };
