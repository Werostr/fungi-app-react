import { useState } from "react";
import users from "../services/users";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await users.login({ email, password });
    } catch (error) {
      console.log("Error during creating new account", error);
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
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
        <button>Login</button>
      </form>
    </>
  );
}
