import "./HomePage.css";
import MainFeeds from '../components/HomePage/MainFeeds'
import SideBarLeft from '../components/HomePage/SideBarLeft'
import SideBarRight from '../components/HomePage/SideBarRight'
import ProfileLeftBar from '../components/ProfilePage/ProfileLeftBar'
import { AuthContext } from "../context/auth.context"
import { useState, useEffect, useContext } from "react";
import ProfileFeeds from '../components/ProfilePage/ProfileFeeds'


function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="HomePage-Container">

        <ProfileLeftBar userId={user?._id} />
        <ProfileFeeds />

        <SideBarRight className='HomePage-item' />
      </div>
    </>
  );
}

export default HomePage;
