import './Chat.css'
import { format } from 'timeago.js';
import apiServices from '../../services/APIServices';
import { useState, useEffect, useContext, useRef } from "react";
import { NavLink } from 'react-router-dom';


const Chat = ({ message }) => {

  const [senderMsgDetail, setSenderMsgDetail] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined);


  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }




  useEffect(() => {
    if (message) {
      apiServices
        .userDetailsRoute(message.messageSender, header)
        .then(response => {
          setSenderMsgDetail(response.data)
        })
        .catch(error => {
          const errorDescription = error.response.data.message;
          console.log("error getting all followers", errorDescription)
          setErrorMessage(errorDescription);
        })
    }


  }, [message])






  return (
    <div className='Chat'>
      <div>
        <img src={senderMsgDetail.profileImage || require("../../assets/placeholder.png")} className="Chat-user-image" />
        <NavLink to={`/profile/${senderMsgDetail._id}`}>
          <h5>{senderMsgDetail.username}</h5>
        </NavLink>
        <p>{message.messageText}</p>
      </div>
      <div>
        <span>{format(message.createdAt)}</span>
      </div>
    </div>
  )
}

export default Chat