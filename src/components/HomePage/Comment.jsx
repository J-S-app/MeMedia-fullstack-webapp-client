import './Comment.css'
import { useState, useEffect } from 'react';
import apiServices from '../../services/APIServices';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';


const Comment = ({ comment, callBackFeeds }) => {
  const [commentOwner, setCommentOwner] = useState('')
  const [likeColor, setLikeColor] = useState('')
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }

  useEffect(() => {
    likeUnlike()
  }, [comment])

  const likeUnlike = () => {
    if (comment.commentLikes.includes(user._id)) {
      return setLikeColor('crimson')
    } else {
      return setLikeColor('pink')
    }
  };




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

  const handleLike = () => {
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
      <div className='Comment-content-wrapper'>
      <div className='Comment-title-and-owner-info'>
        <img src={commentOwner.profileImage || require("../../assets/placeholder.png")} className='Comment-profile-img' />
        <NavLink to={`/profile/${commentOwner._id}`}>
          <span>{commentOwner.username}</span>
        </NavLink>
        </div>
        <div className='Comment-post-data' >
        <span className='Comment-title'>{comment.title}</span>
          {comment?.commentContent && (

            <img
              src={comment.commentContent}
              alt="chosen"
              className='Comment-post-content'
            />

          )}
          
        </div>
        </div>
        <div className='Comment-like'>
        <FavoriteIcon htmlColor={likeColor} onClick={handleLike} className='Comment-title-like-icon' />
        <span>{comment.commentLikes.length == 0 ? `` : `${comment.commentLikes.length} people like this`}</span>
        </div>
      </div>


    </div>

  )
}

export default Comment