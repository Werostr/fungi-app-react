import { useState } from "react";
import users from "../services/users";
import { Grid, TextField, Card, Button, Box } from "@mui/material";
import { EmojiPeople } from "@mui/icons-material";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await users.register({ username, email, password });
    } catch (error) {
      console.log("Error during creating new account", error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingY: 10,
        paddingX: "20%",
      }}
    >
      <Card
        sx={{
          backgroundColor: "rgb(255, 226, 216)",
          paddingY: 6,
        }}
      >
        <Grid component="form" container onSubmit={handleRegister} spacing={2}>
          <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }} item>
            <EmojiPeople
              sx={{
                fontSize: "70px",
              }}
            ></EmojiPeople>
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              required
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="email"
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
              id="password"
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
              Register
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
