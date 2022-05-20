import './CreatePost.css'
import { useState, useEffect } from 'react'
import InputEmoji from 'react-input-emoji';
import { useNavigate } from "react-router-dom";
import apiServices from '../../services/APIServices';
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context'



const CreatePost = ({ callBackFeeds }) => {
  const [title, setTitle] = useState('')
  const [userdet, setUserdet] = useState('')
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);


  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }
  const navigate = useNavigate();




  const handleSubmit = (e) => {
    e.preventDefault()

    const requestBody = { title }
  

    apiServices
      .createPostRoute(requestBody, header)
      .then(response => {
        callBackFeeds()
        setTitle('')

      })
      .catch(e => {
        console.log(header)
        console.log('error creating post', e)
      })

  }

  useEffect(() => {

    if (user) {
      apiServices
        .userDetailsRoute(user._id, header)
        .then(response => setUserdet(response.data))
        .catch(error => {
          const errorDescription = error.response.data.errorMessage;
          console.log("error getting user detail", errorDescription)
          setErrorMessage(errorDescription);
        })
    }

  }, [user])








  return (
    <div className='CreatePost-Container'>
      <form onSubmit={handleSubmit} className='CreatePost-background-controller'>
        <div className='CreatePost-top'>
          <div className='CreatePost-profile-title'>
            <img src={userdet.profileImage || require("../../assets/placeholder.png")} className='CreatePost-profile-img' />
            <h6>{userdet.email} </h6>
          </div>
          <InputEmoji
            name="text"
            value={title}
            placeholder='Post new joke'
            className='CreatePost-joke-title'
            onChange={setTitle}
          />
        </div>
        <hr className='CreatePost-hr' />
        <div className='CreatePost-buttom'>
          <input type="file" className='CreatePost-file-input' name="img" accept="image/*" />
          <LinkTwoToneIcon className='CreatePost-file-input' />
          <button className='CreatePost-submit'>Post</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost;