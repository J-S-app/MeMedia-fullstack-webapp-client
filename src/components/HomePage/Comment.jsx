import './Comment.css'
import { useState, useEffect } from 'react';
import apiServices from '../../services/APIServices';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { NavLink } from 'react-router-dom';


const Comment = ({ comment ,callBackFeeds }) => {
  const [commentOwner, setCommentOwner] = useState('')
  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }




  useEffect(() => {
    apiServices
      .userDetailsRoute(comment.commentOwner, header)
      .then(response => setCommentOwner(response.data))
      .catch(error => {
        const errorDescription = error.response.data.errorMessage;
        console.log("error getting comment owner detail", errorDescription)
        setErrorMessage(errorDescription);
      })
  }, [])

const handleLike=()=>{
  apiServices
  .likesCommentRoute(comment._id, header, header)
  .then(response => {
    callBackFeeds()
  })
  .catch(error => {
    const errorDescription = error.response.data.errorMessage;
    console.log("error like comment ", errorDescription)
    setErrorMessage(errorDescription);
  })
}



  return (
    <div className='Comment-container'>
      <hr />
      <div className='Comment-title-and-owner'>
        <img src={commentOwner.profileImage || require("../../assets/placeholder.png")} className='Comment-profile-img' />
        <NavLink to={`/profile/${commentOwner._id}`}>
        <span>{commentOwner.email}</span>
        </NavLink>
        <p className='Comment-title'>{comment.title}</p>
        <ThumbUpAltOutlinedIcon className='Comment-title-like-icon'  onClick={handleLike} />
        <span>{comment.commentLikes.length == 0 ? `` : `${comment.commentLikes.length} people like this`}</span>
      </div>
    

    </div>

  )
}

export default Comment