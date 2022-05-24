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
  const [randomizedMeme,setRandomizedMeme] = useState(1);

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
    setRandomizedMeme(Math.floor(Math.random()*(42-1+1)+1))
  }, [user?._id])


  return (
    <div className='SideBar-right'>
      <div className='SideBar-right-container'>
        
        <h4 className='SideBar-right-random-meme-title'>Random Meme</h4>
        <img src={require(`../../assets/memes/(${randomizedMeme}).jpg`)} className="SideBar-right-random-meme" onClick={(e)=>{setRandomizedMeme(Math.floor(Math.random()*(42-1+1)+1))}}/>
        <hr />
        <div className='SideBar-Right-Follower-info'>
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
    </div>
  )
}

export default SideBarRight