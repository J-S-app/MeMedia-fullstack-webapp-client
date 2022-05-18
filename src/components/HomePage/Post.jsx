import './Post.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Post = () => {
  //add state for like functionality
  const [like, setLike] = useState(0)
  const [likeColor, setLikeColor] = useState('pink')
  const [isLiked, setIsLiked] = useState(false)

  //add on click function for like functionality
  const likeHandler=()=>{
    setLike(preLike=> isLiked? preLike-1 : preLike+1);
    setIsLiked(!isLiked);
    isLiked? setLikeColor('pink') : setLikeColor('Crimson');
  }




  return (
    <div className='Post' >
      <div className='Post-container'>
        <div className='Post-top'>
          <img src={require("../../assets/profileImage/(10).jpg")} className='Post-profile-img' />
          <div className='Post-title'>
            <span className='Post-username'>XXX userName</span>
            <span className='Post-date'>XXX hour ago</span>
          </div>
        </div>
        <div className='Post-center'>
          <span className='Post-post-content'>XXXX Post Text Goes Here</span>
          <img src={require("../../assets/profileImage/(4).jpg")} className='Post-shared-img' />
        </div>
        <div className='Post-buttom'>
          <div className='Post-buttom-left'>
          <div className='Post-buttom-left-left-icon'>
            <ModeCommentIcon htmlColor='CadetBlue' className='Post-buttom-icon' />
            <FavoriteIcon htmlColor={likeColor} onClick={likeHandler} className='Post-buttom-icon' />
            <span className='Post-like-counter'> {like} people like this</span>
            </div>
            <div className='Post-buttom-left-right-icon'>
              <DeleteIcon htmlColor='gray' className='Post-buttom-icon ' />
              <EditIcon htmlColor='gray' className='Post-buttom-icon' />
            </div>
          </div>
          <div className='Post-buttom-right'>
            <span className='Post-comment-counter'>XX comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post