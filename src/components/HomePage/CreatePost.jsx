import './CreatePost.css'
import { useState, useEffect } from 'react'
import InputEmoji from 'react-input-emoji';
import { useNavigate } from "react-router-dom";
import apiServices from '../../services/APIServices';
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context'
import { NavLink } from 'react-router-dom';
import Alert from '../cloudinaryUpload/Alert';
import Axios from "axios";




const CreatePost = ({ callBackFeeds }) => {
  const [title, setTitle] = useState('')
  const [userdet, setUserdet] = useState('')
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }
  const navigate = useNavigate();




  const handleSubmit = (e) => {
    e.preventDefault()

    
    if (selectedFile){
      console.log("We have a selected file")
      handleSubmitFile()
    } else {
      console.log("No selected file")
      const requestBody = { title }
      apiServices
          .createPostRoute(requestBody, header)
          .then(response => {
            callBackFeeds()
            setTitle('')
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
            setSelectedFile()
          })
          .catch(e => {
            console.log(header)
            console.log('error creating post', e)
          })
    }

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

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    // e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
      setErrMsg('something went wrong!');
    };
  };

  const uploadImage = () => {

    const formData = new FormData();
    formData.append("file", selectedFile)
    formData.append("upload_preset", "rgly7uw1")

    Axios.post("https://api.cloudinary.com/v1_1/memediacloud/image/upload", formData)
      .then(response => {
        console.log(response.data.secure_url)

        const requestBody = { 
          title, 
          postContent: response.data.secure_url
        }
        console.log(requestBody)

        return apiServices
          .createPostRoute(requestBody, header)
          .then(response => {
            callBackFeeds()
            setTitle('')
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
            setSelectedFile()
          })
          .catch(e => {
            console.log(header)
            console.log('error creating post', e)
          })
      })

      .catch(e => {
        console.log("error uploading content to cloudinary", e)
      })
  }







  return (
    <div className='CreatePost-Container'>
      <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" />
      <form onSubmit={handleSubmit} className='CreatePost-background-controller'>
        <div className='CreatePost-top'>
          <div className='CreatePost-profile-title'>
            <img src={userdet.profileImage || require("../../assets/placeholder.png")} className='CreatePost-profile-img' />
            <NavLink to={`/profile/${userdet._id}`}>
              <h6>{userdet.email} </h6>
            </NavLink>

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
          {/* <input type="file" className='CreatePost-file-input' name="img" accept="image/*" /> */}
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            className="CreatePost-file-input"
          />
          <LinkTwoToneIcon className='CreatePost-file-input' />
          {previewSource && (
            <img
              src={previewSource}
              alt="chosen"
              style={{ maxHeight: '300px' }}
            />
          )}
          <button className='CreatePost-submit'>Post</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost;