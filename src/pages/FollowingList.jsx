import './FollowingList.css';
import apiServices from '../services/APIServices';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';


const FollowingList = () => {

  const [followingsList, setFollowingsList] = useState([])
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const {userId} = useParams()


  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }

  const callBackFollowingList = () => {
    if (user && userId == user?._id) {
      apiServices
        .getFollowingsRoute(user._id, header)
        .then(followingList => {
          setFollowingsList(followingList.data)
        })
        .catch(error => {
          const errorDescription = error.response.data.message;
          console.log("error getting all followings", errorDescription)
          setErrorMessage(errorDescription);
        })

    }if (user && userId != user?._id) {
      apiServices
        .getFollowingsRoute(userId, header)
        .then(followingList => {
          setFollowingsList(followingList.data)
        })
        .catch(error => {
          const errorDescription = error.response.data.message;
          console.log("error getting all followings", errorDescription)
          setErrorMessage(errorDescription);
        })
      }
  }
  useEffect(() => {
    callBackFollowingList()
  }, [])




  return (
    <div className='FollowingList-container'>
      {followingsList.length > 0
        ?
        followingsList.map((following) => {

          return (
            <>
              <div key={following._id} className="FollowingList-fallowers-list">
                <img src={following.profileImage || require("../assets/placeholder.png")} className="FollowingList-fallowers-image" />
                <NavLink to={`/profile/${following._id}`}>
                <h5 className="FollowingList-followers-name">{following.username}</h5>
                </NavLink>
                <span className="FollowingList-catchPhrase" >{following.catchPhrase}</span>
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

export default FollowingList