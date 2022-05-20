import './Comment.css'
import { useState, useEffect } from 'react';
import apiServices from '../../services/APIServices';


const Comment = ({ comment }) => {
  const [commentOwner, setCommentOwner] = useState('')
  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }

  useEffect(() => {
    apiServices
      .userDetailsRoute(comment.commentOwner, header)
      .then(response => setCommentOwner(response.data))
      .catch(error => {
        const errorDescription = error.response.data.errorMessage;
        console.log("error getting user detail", errorDescription)
        setErrorMessage(errorDescription);
      })
  }, [])



  return (
    <div className='Comment-container'>
      <hr />
      <div className='Comment-title-and-owner'>
      <img src={commentOwner.profileImage || require("../../assets/placeholder.png")} className='Comment-profile-img' />
      <span>{commentOwner.email}</span>
        <p className='Comment-title'>{comment.title}</p>

      </div>


    </div>

  )
}

export default Comment