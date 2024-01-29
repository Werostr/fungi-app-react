import axios from "axios";

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

export default { register, login };
