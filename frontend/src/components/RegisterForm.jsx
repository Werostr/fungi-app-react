import { useState } from "react";
import users from "../services/users";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const user = await users.register({ username, email, password });
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("Error during creating new account", error);
    }
  };
  return (
    <>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        ></input>
        <input
          type="text"
          placeholder="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <button>Register</button>
      </form>
    </>
  );
}
