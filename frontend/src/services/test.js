import axios from "axios";

const getTest = async () => {
  try {
    const res = await axios.get("http://localhost:9000/testAPI");
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default { getTest };
