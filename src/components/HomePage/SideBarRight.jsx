import './SideBarRight.css';
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';
import { AuthContext } from "../../context/auth.context"
import apiServices from '../../services/APIServices';
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";


const SideBarRight = () => {

  const [followersList, setFollowersList] = useState([])
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }


  const callBackFollowersList = () => {
    if (user) {
      apiServices
        .getFollowersRoute(user._id, header)
        .then(response => {
          setFollowersList(response.data)
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
  }, [user?._id])






  return (
    <div className='SideBar-right'>
      <div className='SideBar-right-container'>
        <div className='SideBar-right-birthday'>
          <CakeTwoToneIcon htmlColor='tomato' className='SideBar-right-birthday-icon' />
          <span className='SideBar-right-birthday-text'>Happy Birthday XXXX Username</span>
        </div>
        <h4 className='SideBar-right-random-meme-title'>Random Meme</h4>
        <img src={require('../../assets/memes/(12).jpg')} className="SideBar-right-random-meme" />
        <hr />
        <h4 className='SideBar-right-online-followers-title' >Followers</h4>
          <span>
          {followersList.length > 0 &&
          <NavLink to={`/${user?._id}/followers`}>See All</NavLink>
        }
          </span>
        <div className='SideBar-right-online-followers'>
          {followersList.length > 0
            ?
            followersList.map((follower, index) => {
              if (index < 8) {
                return (
                  <>
                    <div className="SideBar-right-online-followers-item">
                      <img src={follower.profileImage || require("../../assets/placeholder.png")} className="SideBar-right-fallowers-image" />
                      <NavLink to={`/profile/${follower._id}`}>
                        <h5 className="SideBar-right-online-followers-name">{follower.username}</h5>
                      </NavLink>
                    </div>
                  </>
                )
              }
            })
            :
            ''
          }

        </div>
      </div>
    </div>
  )
}

export default SideBarRight