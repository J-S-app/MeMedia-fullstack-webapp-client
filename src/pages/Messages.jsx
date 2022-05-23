import Chat from '../components/chat/Chat'
import CurrentFriend from '../components/CurrentFriend/CurrentFriend'
import OnlineFriends from '../components/OnlineFriends/OnlineFriends'
import './Messages.css'
import { useParams } from 'react-router-dom';
import { AuthContext } from "../context/auth.context"
import { useState, useEffect, useContext, useRef } from "react";
import { NavLink } from 'react-router-dom';
import apiServices from '../services/APIServices';
import { io } from "socket.io-client";




const Messages = () => {
  const [chatPairs, setChatPairs] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [currentChat, setCurrentChat] = useState(null)
  const [message, setMessage] = useState([])
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [comingMessage, setComingMessage] = useState(null);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [currentUserDet, setCurrentUserDet] = useState({});




  const scrollRef = useRef()
  const socket = useRef();


  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }




  useEffect(() => {
    socket.current = io("ws://localhost:5600")
  
  }, [])

  useEffect(() => {
    socket.current.on("getMessage", data => {
      setComingMessage({
        messageSender: data.senderId,
        messageText: data.text,
        createdAt: Date.now()

      })
    })
  }, [comingMessage]);




  useEffect(() => {
    comingMessage &&
      currentChat?.chatPair.includes(comingMessage.messageSender) &&
      setMessage(preMsg => [...preMsg, comingMessage])
  }, [comingMessage, currentChat])




  useEffect(() => {
    if(user){
      socket.current.emit("addUser", user?._id)
      socket.current.on("getUsers", users => {
        setOnlineFriends(currentUserDet.followers.filter(flwr => users.find(usr => usr.userId == flwr)))
      })
    }
   
  }, [user,onlineFriends])





  useEffect(() => {
    if (user) {
      apiServices
        .getAllChatsRoute(user._id, header)
        .then(allchatsRes => setChatPairs(allchatsRes.data))
        .catch(error => {
          const errorDescription = error.response.data.message;
          console.log("error getting all chats", errorDescription)
          setErrorMessage(errorDescription);
        })
    }

  }, [user._id])






  useEffect(() => {
    if(currentChat){
      apiServices
        .getAllMessageRoute(currentChat._id, header)
        .then(allmsgRes => setMessage(allmsgRes.data))
        .catch(error => {
          const errorDescription = error.response.data.message;
          console.log("error getting all chats", errorDescription)
          setErrorMessage(errorDescription);
        })
      }
    


  }, [currentChat])






  useEffect(() => {
    if (user) {
      apiServices
      .userDetailsRoute(user._id, header)
      .then(response => {
        setCurrentUserDet(response.data)
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("error getting all followers", errorDescription)
        setErrorMessage(errorDescription);
      })
    }
   

  }, [user])





  const handleSubmit = (e) => {
    e.preventDefault()

    const requestBody = {
      messageId: currentChat?._id,
      messageSender: user?._id,
      messageText: newMessage
    }

    const receiverId = currentChat.chatPair.find(usr => usr != user?._id)

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage
    })

    apiServices
      .createMessageRoute(requestBody, header)
      .then(response => {
        setMessage([...message, response.data])
        setNewMessage('')
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("error create new chat message", errorDescription)
        setErrorMessage(errorDescription);
      })

  }



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])







const callBackUpdatChat=(chatHistory)=>{
  setCurrentChat(chatHistory)
}



useEffect(() => {
 callBackUpdatChat()
}, [])



  return (
    <div className='Messages-container'>
      <div className='Messages-leftbar'>
        <div>
          <input placeholder='search' type="search" />
          {chatPairs.map(conversation => {
            return (
              <div onClick={() =>callBackUpdatChat(conversation)}>
                <CurrentFriend chat={conversation} currentUser={user} />
              </div>
            )
          })}

        </div>
      </div>
      <div className='Messages-center'>
        <div>
          {currentChat
            ?
            <>
              <div ref={scrollRef}>
                {message.map(msg => <Chat message={msg} />)}
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <textarea
                    type='text'
                    value={newMessage}
                    placeholder='write message here...'
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button>send</button>
                </form>
              </div>
            </>
            :
            <span>Start a new chat</span>
          }


        </div>
      </div>
      <div className='Messages-rightbar'>
        <div>
          <OnlineFriends onlineUsers={onlineFriends}  setCurrentChat={callBackUpdatChat} />
        </div>
      </div>
    </div>
  )
}

export default Messages