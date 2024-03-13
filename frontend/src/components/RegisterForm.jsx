import { useState } from "react";
import users from "../services/users";
import { Grid, TextField, Card, Button, Box, Typography } from "@mui/material";
import { EmojiPeople } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPasword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      setErrorEmail(false);
      setErrorPasword(false);
      setErrorUsername(false);
      const res = await users.register({ username, email, password });
      if (res.includes("shortPassword")) {
        setErrorPasword(true);
      }
      if (res.includes("emailExists")) {
        setErrorEmail(true);
      }
      if (res.includes("usernameExists")) {
        setErrorUsername(true);
      }
      if (res === "ok") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
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
              error={errorUsername ? true : false}
              helperText={errorUsername ? "Username already exists" : false}
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
              error={errorEmail ? true : false}
              helperText={errorEmail ? "Email already exists" : false}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              type="password"
              id="password"
              label="Password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
              error={errorPassword ? true : false}
              helperText={errorPassword ? "At least 7 letters" : false}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ width: "50%" }}>
              If you already have an account, you can{" "}
              <Link to="/login">log in</Link>.
            </Typography>
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
