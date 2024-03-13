import { useState } from "react";
import users from "../services/users";
import {
  Card,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await users.login({ email, password });
      window.localStorage.setItem("user-token", user.token);
      setToken(true);
      setError(false);
      navigate("/fungi");
    } catch (error) {
      setError(true);
      console.log("Error during logging", error);
    }
  };
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", justifyContent: "center", paddingTop: 5 }}
    >
      <Box
        sx={{
          width: "50%",
        }}
      >
        <Card
          sx={{
            backgroundColor: "secondary.dark",
            paddingY: 6,
            paddingX: 5,
          }}
        >
          <Grid component="form" container onSubmit={handleLogin} spacing={2}>
            <Grid
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
              item
            >
              <Lock
                sx={{
                  fontSize: "70px",
                }}
              ></Lock>
            </Grid>
            {error && (
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography sx={{ width: "50%", color: "#d13c35" }}>
                  Wrong credentials.
                </Typography>
              </Grid>
            )}

            <Grid xs={12} item>
              <TextField
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                required
                error={error}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
                error={error}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography sx={{ width: "70%" }}>
                If you don't have an account, you can create it{" "}
                <Link to="/register">here</Link>.
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
                Login
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
}
