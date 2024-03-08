import axios from "axios";

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

const register = async (credentials) => {
  try {
    console.log(credentials);
    const res = await axios.post(
      `http://localhost:9000/api/users/register`,
      credentials
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getInfo = async () => {
  try {
    console.log("log from: getInfo");
    const token = getToken();
    if (!token) {
      return {};
    }

    const res = await axios.get("http://localhost:9000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

const login = async (credentials) => {
  try {
    const res = await axios.post(
      `http://localhost:9000/api/users/login`,
      credentials
    );
    return res.data;
  } catch (err) {
    console.log("Something went wrong.");
  }
};

export default { register, login, getInfo };
