import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import AllFungi from "./components/AllFungi";
import NotFound from "./components/NotFound";
import EditFungus from "./components/EditFungus";
import Fungus from "./components/Fungus";
import Welcome from "./components/Welcome";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import NewFungus from "./components/NewFungus";
import RegisterForm from "./components/RegisterForm";
import UserFungi from "./components/UserFungi";
import fungi from "./services/fungi";
import users from "./services/users";
import ChatBot from "./components/Chatbot";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProtectedRoute from "./components/ProtectedRoute";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      dark: "#ff6d75",
      light: "#ff8c94",
    },
    secondary: {
      main: "rgb(255, 226, 216, 0.5)",
      dark: "rgb(255, 226, 216)",
    },
  },
});

function App() {
  const [allFungi, setAllFungi] = useState([]);
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("user-token");
    if (token) {
      setToken(true);
    } else {
      setToken(false);
    }
    fungi
      .getAll()
      .then((foundFungi) => {
        setAllFungi(foundFungi);
      })
      .catch((error) => {
        console.error("Error during downloading data:", error);
      });
  }, []);

  useEffect(() => {
    users
      .getInfo()
      .then((user) => {
        console.log(user);
        if (
          user === "Forbidden" ||
          user === "Unauthorized" ||
          user === undefined
        ) {
          handleLogout();
        } else {
          setUser({
            id: user.id,
            username: user.username,
            email: user.email,
            fungi: user.fungi,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, allFungi]);

  const handleLogout = () => {
    window.localStorage.removeItem("user-token");
    //window.localStorage.removeItem("chat_messages");
    setUser({});
    setToken(false);
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar token={token} logout={handleLogout} />
        <ChatBot />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/login"
            element={
              token ? <Navigate to="/" /> : <LoginForm setToken={setToken} />
            }
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <RegisterForm />}
          />

          <Route path="/fungi" element={<AllFungi allFungi={allFungi} />} />

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/user" element={<UserFungi user={user} />} />
            <Route
              path="/fungi/new"
              element={
                <NewFungus
                  allFungi={allFungi}
                  updateFungi={setAllFungi}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route
              path="/fungi/:id/edit"
              element={
                <EditFungus
                  allFungi={allFungi}
                  updateFungi={setAllFungi}
                  handleLogout={handleLogout}
                  user={user}
                />
              }
            />
          </Route>

          <Route
            path="/fungi/:id"
            element={
              <Fungus
                allFungi={allFungi}
                updateFungi={setAllFungi}
                handleLogout={handleLogout}
                user={user}
              />
            }
          />

          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
