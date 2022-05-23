import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Navbar from "./components/Navbar/Navbar";
import LogIn from "./pages/LogIn";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";
import FollowingList from "./pages/FollowingList";
import ProfileSetting from "./pages/ProfileSetting";
import FollowersList from "./pages/FollowersList";
import Messages from "./pages/Messages";


function App() {


  return (
    <div className="App">
<Navbar />
      <Routes>
       
          <Route  path='/' element={<HomePage />} />
          <Route  path='/auth/login' element={<LogIn />} />
          <Route  path='/auth/signup' element={<Signup />} />
          <Route  path='/profile/:userId' element={<ProfilePage />} />
          <Route  path='/profile/:userId/setting' element={<ProfileSetting />} />
          <Route  path='/editpost/:postId' element={<EditPost/>} />
          <Route  path='/:userId/followings' element={<FollowingList />} />
          <Route  path='/:userId/followers' element={<FollowersList />} />
          {/* <Route  path='/:userId/messages' element={<Messages />} /> */}

      </Routes>
    </div>
  );
}

export default App;
