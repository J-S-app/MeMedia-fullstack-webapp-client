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
  const [commentContentCD, setCommentContentCD] = useState('')

  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }
  //add on click function for like functionality


  useEffect(() => {
    likeUnlike()
  }, [post])

  const likeUnlike = () => {
    const likes = post?.postLikes.filter(like => like._id === user?._id)
    if (likes.length > 0) {
      return setLikeColor('crimson')
    } else {
      return setLikeColor('PeachPuff')
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
      .then(response => {
        setpostOwner(response.data)
      })

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
    const requestBody = {
      title,
      commentContent: commentContentCD
    }

    apiServices
      .createCommentRoute(post._id, requestBody, header)
      .then(response => {
        callBackFeeds()
        setTitle('')
        setCommentContentCD('')

      })
      .catch(e => {
        console.log('error creating comment', e)
      })

  }


  const showCommentBar = () => {
    return setShowComment(!showComment)
  }

  function showUploadWidget(e) {
    e.preventDefault()
    cloudinary.openUploadWidget({
      cloudName: "memediacloud",
      uploadPreset: "rgly7uw1",
      sources: ["local", "url", "camera", "image_search", "facebook", "dropbox", "instagram", "getty", "istock"],
      googleApiKey: "AIzaSyCOms5CX5Je-Yk92vxex2uWopweDa3Q6Kg",
      showAdvancedOptions: true,
      cropping: true,
      multiple: false,
      // folder: "user_images", 
      tags: ["meme", "lol", "memes"],
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      // theme: "purple", //change to a purple theme
      defaultSource: "local",
      styles: {
        palette: {
          window: "#FFFFFF",
          windowBorder: "#90A0B3",
          tabIcon: "#0078FF",
          menuIcons: "#5A616A",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link: "#0078FF",
          action: "#FF620C",
          inactiveTabIcon: "#0E2F5A",
          error: "#F44235",
          inProgress: "#0078FF",
          complete: "#20B832",
          sourceBg: "#E4EBF1"
        },
        fonts: {
          default: null,
          "'Fira Sans', sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Fira+Sans",
            active: true
          }
        }
      }
    }, (err, result) => {
      if (!err && result && result.event === "success") {
        // console.log("Upload Widget event - ", info);
        // console.log(result.info.secure_url)
        setCommentContentCD(result.info.secure_url)

      }
    });
  }

  const handleDiscard = (e) => {
    e.preventDefault()
    setCommentContentCD('')
  }

  return (
    <div className='Post' >
      <div className='Post-container'>
        <div className='Post-top'>

          <div className='Post-title'>
            <NavLink to={`/profile/${postOwner?._id}`}>
              <img src={postOwner?.profileImage || require("../../assets/placeholder.png")} className='Post-profile-img' />
              <span className='Post-username'>{postOwner?.username}</span>
            </NavLink>

            <span className='Post-date'>{format(post?.createdAt)}</span>
          </div>
        </div>
        <div className='Post-center'>
          <span className='Post-post-content'>{post?.title}</span>
          {/* ///  Write condition to show POST CONTENT*/}
          {/* <img src={require("../../assets/profileImage/(4).jpg")} className='Post-shared-img' /> */}
          {post?.postContent && (
            <div className='Post-post-content'>
              <img
                className='Post-shared-img'
                src={post.postContent}
                alt="chosen"
                style={{ maxHeight: '300px' }}
              />
            </div>
          )}
        </div>
        <div className='Post-buttom'>
          <div className='Post-buttom-left'>
            <div className='Post-buttom-left-left-icon'>
              <ModeCommentIcon onClick={showCommentBar} htmlColor='CadetBlue' className='Post-buttom-icon' />
              <FavoriteIcon htmlColor={likeColor} onClick={likeHandler} className='Post-buttom-icon' />
              <span className='Post-like-counter'> {post.postLikes.length == 0 ? `` : post.postLikes.length == 1 ? `${post.postLikes[0].username} like this` : post.postLikes.length > 1 ? `${post.postLikes[post.postLikes.length - 1].username} and ${post.postLikes.length - 1} people like this` : ''} </span>
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
                    name="text"
                    value={title}
                    placeholder='write a comment..'
                    className='CreatePost-joke-title'
                    onChange={setTitle}
                  />
                  <div className='CreatePost-buttom-preload'>
                    {commentContentCD && (
                      < >
                        <img
                          src={commentContentCD}
                          alt="chosen"
                          style={{ maxHeight: '50px' }}
                        />
                      </>
                    )}
                  </div>
                  <div className='CreatePost-buttom'>
                    <div className='CreatePost-bbottom-buttons'>
                      {title && (
                        (!commentContentCD) && (
                          <button onClick={showUploadWidget} className="CreatePost-submit">Upload and comment</button>
                        )
                      )}
                      {(title) && (
                        (commentContentCD) && (

                          <button onClick={handleDiscard} className="CreatePost-discard">Discard</button>
                        )
                      )}
                      <button className='CreatePost-submit'>comment</button>
                    </div>
                  </div>
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