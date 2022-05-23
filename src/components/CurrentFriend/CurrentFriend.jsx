import './CurrentFriend.css'
import { useState, useEffect, useContext } from "react";
import apiServices from '../../services/APIServices';


const CurrentFriend = ({ chat, currentUser }) => {
  const [friend, setFriend] = useState([])
  const [errorMessage, setErrorMessage] = useState(undefined);


  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }



  useEffect(() => {
    if(currentUser){ 
      const friendId = chat.chatPair.find(pair => pair != currentUser._id)
      console.log(friendId)
      apiServices
        .userDetailsRoute(friendId, header)
        .then(friendDet => setFriend(friendDet.data))
        .catch(error => {
          const errorDescription = error.response.data.message;
          console.log("error getting chatPair detail", errorDescription)
          setErrorMessage(errorDescription);
        })
    }

  }, [chat, currentUser._id])


  return (
    <div>

      <img src={friend.profileImage || require("../../assets/placeholder.png")} className="CurrentFriend-user-image" />
      <div className='badge'></div>

      <h5 className="ProfileLeftBar-followers-name">{friend.username}</h5>
    </div>
  )
}

export default CurrentFriend