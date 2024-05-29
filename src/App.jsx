import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Recipes from "./components/Recipes";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </div>
  );
};

export default App;
