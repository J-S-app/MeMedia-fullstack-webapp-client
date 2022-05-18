import './Post.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const Post = () => {
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
            <ModeCommentIcon htmlColor='gray' className='Post-buttom-icon' />
            <FavoriteIcon htmlColor='pink' className='Post-buttom-icon' />
            <span className='Post-like-counter'>2people like this</span>
            </div>
            <div className='Post-buttom-left-right-icon'>
              <DeleteIcon htmlColor='gray' className='Post-buttom-icon' />
              <EditIcon htmlColor='gray' className='Post-buttom-icon' />
            </div>
          </div>
          <div className='Post-buttom-right'>
            <span className='Post-comment-counter'>2 comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post