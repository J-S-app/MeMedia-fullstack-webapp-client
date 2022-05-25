import Chat from '../components/chat/Chat'
import CurrentFriend from '../components/CurrentFriend/CurrentFriend'
import OnlineFriends from '../components/OnlineFriends/OnlineFriends'
import './Messages.css'
import { useParams } from 'react-router-dom';
import { AuthContext } from "../context/auth.context"
import { useState, useEffect, useContext, useRef } from "react";
import apiServices from '../services/APIServices';
import { io } from "socket.io-client";
import { NavLink } from 'react-router-dom';




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
  const { userId } = useParams()



  const scrollRef = useRef()
  // const socket = useRef();


  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }




  // useEffect(() => {
  //   socket.current = io("ws://localhost:5600")

  // }, [])

  // useEffect(() => {
  //   socket.current.on("getMessage", data => {
  //     setComingMessage({
  //       messageSender: data.senderId,
  //       messageText: data.text,
  //       createdAt: Date.now()

  //     })
  //   })
  // }, [comingMessage]);




  useEffect(() => {
    comingMessage &&
      currentChat?.chatPair.includes(comingMessage.messageSender) &&
      setMessage(preMsg => [...preMsg, comingMessage])
  }, [comingMessage, currentChat])




  // useEffect(() => {

  //     socket.current.emit("addUser",userId)
  //     // socket.current.on("getUsers", users => {
  //     //   setOnlineFriends(currentUserDet.followers.filter(flwr => users.find(usr => usr.userId == flwr)))
  //     // })


  // }, [userId])





  useEffect(() => {

    apiServices
      .getAllChatsRoute(userId, header)
      .then(allchatsRes => setChatPairs(allchatsRes.data))
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("error getting all chats", errorDescription)
        setErrorMessage(errorDescription);
      })


  }, [userId])






  useEffect(() => {
    if (currentChat) {
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






  // useEffect(() => {

  //     apiServices
  //     .userDetailsRoute(userId, header)
  //     .then(response => {
  //       setCurrentUserDet(response.data)
  //     })
  //     .catch(error => {
  //       const errorDescription = error.response.data.message;
  //       console.log("error getting all followers", errorDescription)
  //       setErrorMessage(errorDescription);
  //     })



  // }, [userId])





  const handleSubmit = (e) => {
    e.preventDefault()

    const requestBody = {
      messageId: currentChat?._id,
      messageSender: userId,
      messageText: newMessage
    }

    // const receiverId = currentChat.chatPair.find(usr => usr != userId)

    // socket.current.emit("sendMessage", {
    //   senderId: userId,
    //   receiverId,
    //   text: newMessage
    // })

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







  const callBackUpdatChat = (chatHistory) => {
    setCurrentChat(chatHistory)
  }



  useEffect(() => {
    callBackUpdatChat()
  }, [])


  const handleRefresh = (e) => {
    e.preventDefault()
  }




  return (
    <div className='Messages-container'>
      <div className='Messages-leftbar'>
        <div className='Messages-leftbar-wrapper'>
          {/* <input placeholder='search' className="Messages-leftbar-input"  type="search" /> */}
          {chatPairs.map(conversation => {
            return (
              <div onClick={() => callBackUpdatChat(conversation)}>
                <CurrentFriend chat={conversation} currentUser={userId} />
              </div>
            )
          })}

        </div>
      </div>
      <div className='Messages-center'>
        <div className='Messages-center-wrapper'>
          {currentChat
            ?
            <>
              <div className='Messages-center-top'>
                {message?.map(msg => {
                  return (
                    <div ref={scrollRef}> <Chat message={msg} own={msg.messageSender == userId} /></div>
                  )

                })}
              </div>
              <div >
                <form className='Messages-center-bottom' onSubmit={handleSubmit}>
                  <textarea
                    required
                    type='text'
                    value={newMessage}
                    className='Messages-center-bottom-input'
                    placeholder='write message here...'
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button className='Messages-center-bottom-submitbtn'>send</button>
                </form>

              </div>
            </>
            :
            <span className="noConversationText"> Start a new chat</span>
          }


        </div>
      </div>
      <div className='Messages-rightbar'>
        <div className='Messages-rightbar-wrapper'>
          {/* <OnlineFriends onlineUsers={onlineFriends}  setCurrentChat={callBackUpdatChat} /> */}
        </div>
      </div>
    </div>
  )
}

export default Messages