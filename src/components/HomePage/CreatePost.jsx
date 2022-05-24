import './CreatePost.css'
import { useState, useEffect } from 'react'
import InputEmoji from 'react-input-emoji';
import { useNavigate } from "react-router-dom";
import apiServices from '../../services/APIServices';
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context'
import { NavLink } from 'react-router-dom';


const CreatePost = ({ callBackFeeds }) => {
  const [title, setTitle] = useState('')
  const [userdet, setUserdet] = useState('')
  const [postContentForCD, setPostContentForCD] = useState('');
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }
  const navigate = useNavigate();




  const handleSubmit = (e) => {
    e.preventDefault()
    const requestBody = { 
      title,
    postContent: postContentForCD }
    apiServices
      .createPostRoute(requestBody, header)
      .then(response => {
        callBackFeeds()
        setTitle('')
        setPostContentForCD('')
      })
      .catch(e => {
        console.log('error creating post', e)
      })

  }

  useEffect(() => {

    if (user) {
      apiServices
        .userDetailsRoute(user._id, header)
        .then(response => {
          setUserdet(response.data)
          callBackFeeds()
        })
        .catch(error => {
          const errorDescription = error.response.data.errorMessage;
          console.log("error getting user detail", errorDescription)
          setErrorMessage(errorDescription);
        })
    }

  }, [user])

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
      tags: ["meme", "lol","memes"],
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
        setPostContentForCD(result.info.secure_url)
      }
    });
  }

  const handleDiscard = (e) =>{
    e.preventDefault()
    setPostContentForCD('')
  }

  return (
    <div className='CreatePost-Container'>
      <form onSubmit={handleSubmit} className='CreatePost-background-controller'>
        <div className='CreatePost-top'>
          <div className='CreatePost-profile-title'>
            <img src={userdet.profileImage || require("../../assets/placeholder.png")} className='CreatePost-profile-img' />
            <NavLink to={`/profile/${userdet._id}`}>
              <h5>{userdet.username} </h5>
            </NavLink>

          </div>
          <InputEmoji
            name="text"
            value={title}
            placeholder={`post new joke ${userdet.username} ..`}
            className='CreatePost-joke-title'
            onChange={setTitle}
          />
          <div className='CreatePost-buttom-preload'>
        {postContentForCD && (
            < >
              <img
                src={postContentForCD}
                alt="chosen"
                style={{ maxHeight: '100px' }}
              />
            </>
          )}
          </div>
        </div>
        <hr className='CreatePost-hr' />
        <div className='CreatePost-buttom'>
          <div className='CreatePost-bbottom-buttons'>
          <div className='CreatePost-file-input' ></div>
          {/* <LinkTwoToneIcon className='CreatePost-file-input' /> */}
          {(title )&& (
            (!postContentForCD) &&(
            <button onClick={showUploadWidget} className="CreatePost-submit">Upload</button>
            )
          )}
          {(title )&& (
            (postContentForCD) &&(

            <button onClick={handleDiscard} className="CreatePost-discard">Discard</button>
            )
          )}
          <button className='CreatePost-submit'>Post</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreatePost;