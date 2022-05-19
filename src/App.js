import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Navbar from "./components/Navbar/Navbar";
import LogIn from "./pages/LogIn";
import Signup from "./pages/Signup";




function App() {
  return (
    <div className="App">
<Navbar />
      <Routes>
       
          <Route  path='/' element={<HomePage />} />
          <Route  path='/auth/login' element={<LogIn />} />
          <Route  path='/auth/signup' element={<Signup />} />
          <Route  path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
