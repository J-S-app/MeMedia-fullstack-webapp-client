import './ProfilePage.css';
import ProfileLeftBar from '../components/ProfilePage/ProfileLeftBar'
import ProfileFeeds from '../components/ProfilePage/ProfileFeeds'
import { useParams } from 'react-router-dom';
import { AuthContext } from "../context/auth.context"
import apiServices from '../services/APIServices';
import { useState, useEffect, useContext } from "react";
import { NavLink } from 'react-router-dom';

const ProfilePage = () => {
  const { userId } = useParams()
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [userDetail, setUserDetail] = useState({});



  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }



  const handleFollow = () => {
    apiServices
      .followUserRoute(userId, header, header)
      .then(response => console.log(response))
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("error  followings users", errorDescription)
        setErrorMessage(errorDescription);
      })
  }

  useEffect(() => {
    apiServices
      .userDetailsRoute(userId, header)
      .then(response => setUserDetail(response.data))
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("error  getting user detail", errorDescription)
        setErrorMessage(errorDescription);
      })

  }, [])








  return (
    <div className="ProfilePage-container ">
      <div className='ProfilePage-left'>
        <ProfileLeftBar userId={userId} />
      </div>

      <div className='ProfilePage-right'>
        <div className='ProfilePage-right-top'>

          <div className='ProfilePage-right-top-images'>
            <img src={userDetail.coverImage || require("../assets/coverimage-placeholder.jpg")} className="ProfilePage-right-top-coverimage" />
            <img src={userDetail.profileImage || require("../assets/placeholder.png")} className="ProfilePage-right-top-profileimage" />
            <div className='ProfilePage-right-top-userinfo'>
              <h3 className="ProfilePage-right-top-username">{userDetail.email}</h3>
              <span className="ProfilePage-right-top-catchphrase">{userDetail.catchPhrase}</span>

            </div>
          </div>
          <>
            {user?._id != userId
              ?
              <button onClick={handleFollow}>Follow</button>
              :
              <NavLink to={`/profile/${userId}/setting`}> Edit Profile </NavLink>
            }
          </>
        </div>
        <div className='ProfilePage-right-bottom'>
          <ProfileFeeds userId={userId} />

        </div>
      </div>




    </div>
  )
}

export default ProfilePage