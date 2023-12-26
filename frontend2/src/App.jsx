import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Test from "./components/Test";
import AllFungi from "./components/AllFungi";
import NotFound from "./components/NotFound";
import EditFungus from "./components/EditFungus";
import Fungus from "./components/Fungus";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NewFungus from "./components/NewFungus";

import Register from "./components/Register";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/test" element={<Test />} />

        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fungi" element={<AllFungi />} />
        <Route path="/fungi/new" element={<NewFungus />} />
        <Route path="/fungi/:id" element={<Fungus />} />
        <Route path="/fungi/:id/edit" element={<EditFungus />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
