import "./ProfileLeftBar.css"
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"
import apiServices from '../../services/APIServices';
import { useState, useEffect, useContext } from "react";


const ProfileLeftBar = ({ userId }) => {


  const [followingsList, setFollowingsList] = useState([])
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);



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

    } if (user && userId != user?._id) {
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
  }, [user?._id, userId])


  const GetFridendList = () => {
    const result = followingsList.map((following, index) => {
      if (index < 8) {
        return (
          <>
            <div key={following._id} className="ProfileLeftBar-fallowers-list">
              <img src={following.profileImage || require("../../assets/placeholder.png")} className="ProfileLeftBar-fallowers-image" />
              <NavLink to={`/profile/${following._id}`}>
                <h5 className="ProfileLeftBar-followers-name">{following.email}</h5>
              </NavLink>
            </div>
          </>
        )
      }

    })

    return result;
  }




  return (
    <div className="ProfileLeftBar-container">
      <div className="ProfileLeftBar-title">
        <h4>Friends </h4>
        <div>
          {followingsList.length > 0
            ?
            <>
              <div>
                {userId == user?._id
                  ?
                  <NavLink to={`/${user?._id}/folowings`}>See All</NavLink>
                  :
                  <NavLink to={`/${userId}/folowings`}>See All</NavLink>
                }
              </div>
              <div>
                {GetFridendList()}
              </div>

            </>
            :
            ""}
        </div>
      </div>

    </div>
  )
}

export default ProfileLeftBar