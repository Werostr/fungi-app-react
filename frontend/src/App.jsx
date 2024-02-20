import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AllFungi from "./components/AllFungi";
import NotFound from "./components/NotFound";
import EditFungus from "./components/EditFungus";
import Fungus from "./components/Fungus";
import Welcome from "./components/Welcome";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import NewFungus from "./components/NewFungus";
import RegisterForm from "./components/RegisterForm";
import fungi from "./services/fungi";
import ChatBot from "./components/Chatbot";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

function App() {
  const [allFungi, setAllFungi] = useState([]);

  useEffect(() => {
    fungi
      .getAll()
      .then((foundFungi) => {
        setAllFungi(foundFungi);
      })
      .catch((error) => {
        console.error("Error during downloading data:", error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <ChatBot />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/fungi" element={<AllFungi allFungi={allFungi} />} />
          <Route
            path="/fungi/new"
            element={
              <NewFungus allFungi={allFungi} updateFungi={setAllFungi} />
            }
          />
          <Route
            path="/fungi/:id"
            element={<Fungus allFungi={allFungi} updateFungi={setAllFungi} />}
          />
          <Route
            path="/fungi/:id/edit"
            element={
              <EditFungus allFungi={allFungi} updateFungi={setAllFungi} />
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
