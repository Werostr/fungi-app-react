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
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/fungi" element={<AllFungi allFungi={allFungi} />} />
        <Route
          path="/fungi/new"
          element={<NewFungus allFungi={allFungi} addFungus={setAllFungi} />}
        />
        <Route
          path="/fungi/:id"
          element={<Fungus allFungi={allFungi} updateFungus={setAllFungi} />}
        />
        <Route
          path="/fungi/:id/edit"
          element={<EditFungus allFungi={allFungi} editFungus={setAllFungi} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
