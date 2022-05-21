import "./SideBarLeft.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"
import apiServices from '../../services/APIServices';
import { useState, useEffect, useContext } from "react";



const SideBarLeft = () => {
  const [followingsList, setFollowingsList] = useState([])
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);



  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }

  const callBackFollowingList = () => {
    if (user) {
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

    }
  }
  useEffect(() => {
    callBackFollowingList()
  }, [user?._id])


  return (
    <div className="SideBar-left">
      <div className="SideBar-left-title">
        <h4>Followings </h4>
        {followingsList.length > 0 &&
          <NavLink to={`/${user?._id}/followings`}>See All</NavLink>
        }

      </div>


      {followingsList.length > 0
        ?
        followingsList.map((following, index) => {
          if (index < 8) {
            return (
              <>
                <div key={following._id} className="SideBar-left-fallowers-list">
                  <img src={following.profileImage || require("../../assets/placeholder.png")} className="SideBar-left-fallowers-image" />
                  <NavLink to={`/profile/${following._id}`}>
                    <h5 className="SideBar-left-followers-name">{following.username}</h5>
                  </NavLink>
                </div>
              </>
            )
          }

        })
        :
        ""
      }
    </div>
  )
}

export default SideBarLeft