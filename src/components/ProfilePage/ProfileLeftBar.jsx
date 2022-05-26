import "./ProfileLeftBar.css"
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"
import apiServices from '../../services/APIServices';
import { useState, useEffect, useContext } from "react";


const ProfileLeftBar = ({ userId,followersList }) => {


  const [followingsList, setFollowingsList] = useState([])
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);



  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }

  const callBackFollowingList = () => {

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
  useEffect(() => {
    callBackFollowingList()
  }, [user?._id, userId,followersList])


  const GetFollowingsList = () => {
    const result = followingsList.map((following, index) => {
      if (index < 8) {
        return (
          <div >
            <div key={following._id} className="ProfileLeftBar-fallowers-list">
              <div className="ProfileLeftBar-followers-name">
                <NavLink to={`/profile/${following._id}`}>
                  <img src={following.profileImage || require("../../assets/placeholder.png")} className="ProfileLeftBar-fallowers-image" />
                  <h5 >{following.username}</h5>
                </NavLink>
              </div>
            </div>
          </div>
        )
      }

    })

    return result;
  }




  return (
    <div className="ProfileLeftBar-container">
      <div className="ProfileLeftBar-title">
        <h4>Followings </h4>
        <>
          {followingsList.length > 0
            ?
            <>
              <div className="ProfileLeftBar-seeAll">
                {userId == user?._id
                  ?
                  <NavLink to={`/${user?._id}/followings`}>See All</NavLink>
                  :
                  <NavLink to={`/${userId}/followings`}>See All</NavLink>
                }
              </div>
              <div className="ProfileLeftBar-fallowers-wrapper">
                {GetFollowingsList()}
              </div>

            </>
            :
            <p>you didn't fallow nobody </p>}
        </>
      </div>

    </div>
  )
}

export default ProfileLeftBar