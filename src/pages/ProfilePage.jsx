import './ProfilePage.css';
import ProfileLeftBar from '../components/ProfilePage/ProfileLeftBar'
import ProfileFeeds from '../components/ProfilePage/ProfileFeeds'
import { useParams } from 'react-router-dom';
import { AuthContext } from "../context/auth.context"
import apiServices from '../services/APIServices';
import { useState, useEffect, useContext } from "react";

const ProfilePage = () => {
  const { userId } = useParams()
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);



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




  return (
    <div className="ProfilePage-container ">
      <div className='ProfilePage-left'>
        <ProfileLeftBar userId={userId} />
      </div>

      <div className='ProfilePage-right'>
        <div className='ProfilePage-right-top'>

          <div className='ProfilePage-right-top-images'>
            <img src={require('../assets/coverImage/2.jpg')} className="ProfilePage-right-top-coverimage" />
            <img src={require('../assets/profileImage/(1).jpg')} className="ProfilePage-right-top-profileimage" />
            <div className='ProfilePage-right-top-userinfo'>
              <h3 className="ProfilePage-right-top-username">XXX User Name</h3>
              <span className="ProfilePage-right-top-catchphrase">XXX CatchPhrase goes here</span>

            </div>
          </div>
          {user?._id != userId
            ?
            <button onClick={handleFollow}>Follow</button>
            :
            ''
          }

        </div>
        <div className='ProfilePage-right-bottom'>
          <ProfileFeeds userId={userId} />

        </div>
      </div>




    </div>
  )
}

export default ProfilePage