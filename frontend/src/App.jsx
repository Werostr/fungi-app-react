import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Test from "./components/Test";
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

  const addFungus = (item) => {
    setAllFungi((prevFungi) => [...prevFungi, { ...item }]);
  };

  const editFungus = (item) => {
    setAllFungi((prevFungi) =>
      prevFungi.map((e) => {
        if (e._id === item._id) {
          return { ...item };
        } else {
          return e;
        }
      })
    );
  };

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
        <Route path="/test" element={<Test />} />

        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/fungi" element={<AllFungi allFungi={allFungi} />} />
        <Route
          path="/fungi/new"
          element={<NewFungus addFungus={addFungus} />}
        />
        <Route path="/fungi/:id" element={<Fungus allFungi={allFungi} />} />
        <Route
          path="/fungi/:id/edit"
          element={<EditFungus editFungus={editFungus} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
