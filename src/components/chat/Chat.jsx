import './Chat.css'
import { format } from 'timeago.js';
import apiServices from '../../services/APIServices';
import { useState, useEffect, useContext, useRef } from "react";
import { NavLink } from 'react-router-dom';


const Chat = ({ message, own }) => {

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
    <div className={own ? 'Chat-container own' : 'Chat-container'}>
      <div className='Chat-top'>

        <NavLink to={`/profile/${senderMsgDetail._id}`}>
          <img src={senderMsgDetail.profileImage || require("../../assets/placeholder.png")} className="Chat-user-image" />
        </NavLink>

        <p className='Chat-message-text'>{message.messageText}</p>
      </div>
      <div className='Chat-create-date'>
       {format(message.createdAt)}
      </div><br />
    </div>
  )
}

export default Chat