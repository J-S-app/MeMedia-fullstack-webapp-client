import './FollowersList.css';
import apiServices from '../services/APIServices';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';

const FollowersList = () => {

  const [followersList, setFollowerssList] = useState([])
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const {userId} = useParams()

  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }


  const callBackFollowersList = () => {
    if (user && userId == user?._id) {
      apiServices
        .getFollowersRoute(user._id, header)
        .then(response => {
          setFollowerssList(response.data)
        })
        .catch(error => {
          const errorDescription = error.response.data.message;
          console.log("error getting all followers", errorDescription)
          setErrorMessage(errorDescription);
        })

    }if (user && userId != user?._id) {
      apiServices
        .getFollowersRoute(userId, header)
        .then(response => {
          setFollowerssList(response.data)
        })
        .catch(error => {
          const errorDescription = error.response.data.message;
          console.log("error getting all followers", errorDescription)
          setErrorMessage(errorDescription);
        })
      }
  }
  useEffect(() => {
    callBackFollowersList()
  }, [])




  return (
    <div className='FollowersList-container'>
      {followersList.length > 0
        ?
        followersList.map((follower) => {

          return (
            <>
              <div key={follower._id} className="FollowersList-fallowers-list">
                <img src={follower.profileImage || require("../assets/placeholder.png")} className="FollowersList-fallowers-image" />
                <NavLink to={`/profile/${follower._id}`}>
                <h5 className="FollowersList-followers-name">{follower.username}</h5>
                </NavLink>
                <span className="FollowersList-catchPhrase" >{follower.catchPhrase}</span>
              </div>
            </>
          )

        })
        :
        ""
      }
    </div>
  )
}

export default FollowersList;