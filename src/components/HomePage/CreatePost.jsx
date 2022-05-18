import './CreatePost.css'
import { useState } from 'react'
import InputEmoji from 'react-input-emoji'

const CreatePost = () => {
  const [ text, setText ] = useState('')




  return (
    <div className='CreatePost-Container'>
      <div className='CreatePost-background-controller'>
        <div className='CreatePost-top'>
          <div className='CreatePost-profile-title'>
            <img src={require("../../assets/profileImage/a.jpeg")} className='CreatePost-profile-img' />
            <h6>XXX User Name </h6>
          </div>
          <InputEmoji
          value={text}
          onChange={setText}
          placeholder='Post new joke'
          className='CreatePost-joke-title'
          cleanOnEnter
        />
        </div>
        <hr className='CreatePost-hr' />
        <div className='CreatePost-buttom'>
          <input type="file" className='CreatePost-file-input' name="img" accept="image/*" />
          <button className='CreatePost-submit'>Post</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost;