import './OnlineFriends.css'
import { useState, useEffect, useContext } from "react";
import apiServices from '../../services/APIServices';
import { AuthContext } from "../../context/auth.context"



const OnlineFriends = ({ onlineUsers, setCurrentChat }) => {
  const { user } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [onlineFollowers, setOnlineFollowers] = useState([])
  const [errorMessage, setErrorMessage] = useState(undefined);

  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }



  useEffect(() => {
    if (user) {
      apiServices
        .getFollowersRoute(user._id, header)
        .then(response => {
          setFollowers(response.data)
        })
        .catch(error => {
          const errorDescription = error.response.data.message;
          console.log("error getting all followers", errorDescription)
          setErrorMessage(errorDescription);
        })
    }

  }, [user])




  useEffect(() => {
    setOnlineFollowers(followers?.filter(follower => onlineUsers?.includes(follower?._id)))
  }, [followers, onlineUsers]);


  const handleClick = (onlineFollower) => {
    apiServices
      .getCommonChatRoute(onlineFollower._id, user._id, header)
      .then(response => setCurrentChat(response.data))
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("error getting all chats of a pair", errorDescription)
        setErrorMessage(errorDescription);
      })
  }




  return (
    <div className='OnlineFriends'>
      <h3>online friends</h3>
      {onlineFollowers.length > 0
        ?
        <>
          {onlineFollowers.map(onlineFollower => {
            return (
              <div onClick={() => { handleClick(onlineFollower) }}>
                <div>
                  <img src={onlineFollower.profileImage || require("../../assets/placeholder.png")} className="OnlineFriends-user-image" />
                  <div className='badge'></div>
                </div>
                <h5 className="ProfileLeftBar-followers-name">{onlineFollower.username}</h5>
              </div>
            )
          })}
        </>
        :
        ''
      }

    </div>
  )
}

export default OnlineFriends