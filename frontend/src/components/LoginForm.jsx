import { useState } from "react";
import users from "../services/users";
import { Card, Grid, TextField, Button, Box } from "@mui/material";
import { Lock } from "@mui/icons-material";

export default function LoginForm({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await users.login({ email, password });
      console.log(user);
      window.localStorage.setItem("user-token", user.token); // TODO: what happens when token expires after 1 h
      setToken(true);
    } catch (error) {
      console.log("Error during logging", error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingY: 10,
        paddingX: "15%",
      }}
    >
      <Card
        sx={{
          backgroundColor: "rgb(255, 226, 216)",

          paddingY: 6,
        }}
      >
        <Grid component="form" container onSubmit={handleLogin} spacing={2}>
          <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }} item>
            <Lock
              sx={{
                fontSize: "70px",
              }}
            ></Lock>
          </Grid>
          <Grid xs={12} item>
            <TextField
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              required
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              label="Password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </Grid>
          <Grid xs={12} item>
            <Button
              sx={{
                color: "primary.dark",
                borderColor: "primary.light",
                "&:hover": {
                  borderColor: "primary.dark",
                },
              }}
              type="submit"
              variant="outlined"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
