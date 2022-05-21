import './Post.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { format } from 'timeago.js';
import apiServices from '../../services/APIServices';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context'
import InputEmoji from 'react-input-emoji';
import Comment from './Comment'





const Post = ({ post, callBackFeeds }) => {
  //add state for like functionality
  const [postOwner, setpostOwner] = useState('')
  const [likeColor, setLikeColor] = useState('')
  const [showComment, setShowComment] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  const [title, setTitle] = useState('')



  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }
  //add on click function for like functionality


  useEffect(() => {
    likeUnlike()
  }, [post])

  const likeUnlike = () => {
    if (post.postLikes.includes(user._id)) {
      return setLikeColor('crimson')
    } else {
      return setLikeColor('pink')
    }
  };




  const likeHandler = () => {

    const postId = post._id

    apiServices
      .likesPostRoute(postId, header, header)
      .then(response => {
        callBackFeeds()
      })
      .catch(error => {
        const errorDescription = error.response.data.errorMessage;
        console.log("error like post ", errorDescription)
        setErrorMessage(errorDescription);
      })

  }


  useEffect(() => {
    apiServices
      .userDetailsRoute(post.postOwner, header)
      .then(response => setpostOwner(response.data))
      .catch(error => {
        const errorDescription = error.response.data.errorMessage;
        console.log("error getting user detail", errorDescription)
        setErrorMessage(errorDescription);
      })
  }, [])




  const handlePostDelete = () => {
    apiServices
      .deletePostRoute(post._id, header)
      .then(response => callBackFeeds())
      .catch(error => {
        const errorDescription = error.response.data.errorMessage;
        console.log("error deleteing post ", errorDescription)
        setErrorMessage(errorDescription);
      })


  }


  const handleCommentSubmit = (e) => {
    e.preventDefault()

    const requestBody = { title }


    apiServices
      .createCommentRoute(post._id, requestBody, header)
      .then(response => {
        console.log('response of comment', response)
        callBackFeeds()
        setTitle('')

      })
      .catch(e => {
        console.log(header)
        console.log('error creating comment', e)
      })

  }


const showCommentBar=()=>{
  return setShowComment(!showComment)
}




  return (
    <div className='Post' >
      <div className='Post-container'>
        <div className='Post-top'>
          <img src={postOwner.profileImage || require("../../assets/placeholder.png")} className='Post-profile-img' />
          <div className='Post-title'>
            <NavLink to={`/profile/${postOwner?._id}`}>
              <span className='Post-username'>{postOwner?.username}</span>
            </NavLink>

            <span className='Post-date'>{format(post?.createdAt)}</span>
          </div>
        </div>
        <div className='Post-center'>
          <span className='Post-post-content'>{post?.title}</span>
          {/* ///  Write condition to show POST CONTENT*/}
          {/* <img src={require("../../assets/profileImage/(4).jpg")} className='Post-shared-img' /> */}
        </div>
        <div className='Post-buttom'>
          <div className='Post-buttom-left'>
            <div className='Post-buttom-left-left-icon'>
              <ModeCommentIcon onClick={showCommentBar} htmlColor='CadetBlue' className='Post-buttom-icon' />
              <FavoriteIcon htmlColor={likeColor} onClick={likeHandler} className='Post-buttom-icon' />
              <span className='Post-like-counter'> {post.postLikes.length == 0 ? `` : `${post.postLikes.length} people like this`} </span>
            </div>
            <div className='Post-buttom-left-right-icon'>
              {user?._id == postOwner?._id
                ?
                <>
                  <DeleteIcon onClick={handlePostDelete} htmlColor='gray' className='Post-buttom-icon ' />
                  <NavLink to={`/editpost/${post?._id}`}><EditIcon htmlColor='gray' className='Post-buttom-icon' /></NavLink>
                </>
                :
                ""
              }
            </div>
          </div>
          <div className='Post-buttom-right'>
            <span className='Post-comment-counter'>{post?.postComments.length > 1 ? `${post?.postComments.length} comments` : `${post?.postComments.length} comment`} </span>
          </div>
          {showComment 
          &&
          <div className='Post-buttom-comment'>
            <div className='Post-buttom-comment-form'>
              <form onSubmit={handleCommentSubmit}>
                <InputEmoji
                  name="title"
                  value={title}
                  placeholder='write a comment..'
                  className='CreatePost-joke-title'
                  onChange={setTitle}
                />
                <button>comment</button>
              </form>

            </div>
            <div className='Post-buttom-comment-list'>
              {post.postComments.map(comment => <Comment callBackFeeds={callBackFeeds} key={comment._id} comment={comment} />).reverse()}
            </div>
          </div>
          }
          

        </div>
      </div>
    </div>
  )
}

export default Post