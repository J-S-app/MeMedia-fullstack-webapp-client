import './EditPost.css'
import InputEmoji from 'react-input-emoji';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiServices from '../services/APIServices';
import { useNavigate } from "react-router-dom";


const EditPost = () => {

  const { postId } = useParams()
  const [title, setTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }
  const navigate = useNavigate();



  useEffect(() => {

    apiServices
      .getOnePostRoute(postId, header)
      .then(postDetail => {
        setTitle(postDetail.data.title)
        setPostContent(postDetail.data.postContent)
      })
      .catch((error) => console.log('error getting post detail', error));


  }, [postId])


  const handleSubmit = (e) => {
    e.preventDefault()
    const requestBody = { title }
    apiServices
      .editOnePostRoute(postId, requestBody, header)
      .then(response => {
        navigate("/")
      })
      .catch((error) => console.log('error updating post', error));
  }


  return (
    <div className='EditPost-container'>
      <form onSubmit={handleSubmit}>
        <div className='EditPost-items'>
          <div className='EditPost-joke-title'>
            <br /><br /> <br /><br /><br /><br /> <br /><br /><br /><br />
            {postContent &&
              <div >
                <img
                className='EditPost-joke-img'
                  src={postContent}
                  style={{ maxHeight: '300px' }}
                />
              </div>
            }
            <InputEmoji
              name="text"
              value={title}
              placeholder='Post new joke'
              className='EditPost-joke-title-input'
              onChange={setTitle}
            />
          </div>
          <div>
            <button className='EditPost-btn'>Edit</button>
          </div>
        </div>
      </form>

    </div>
  )
}

export default EditPost