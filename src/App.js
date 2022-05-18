import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage'
import Navbar from "./components/Navbar/Navbar";




function App() {
  return (
    <div className="App">
<Navbar />
      <Routes>
       
          <Route  path='/' element={<HomePage />} />
   
      </Routes>
    </div>
  );
}

export default App;
