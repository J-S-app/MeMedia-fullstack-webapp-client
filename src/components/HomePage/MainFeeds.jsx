import './MainFeeds.css'
import CreatePost from './CreatePost'
import Post from './Post'
import apiServices from '../../services/APIServices';
import { useState,useEffect } from "react";


const MainFeeds = () => {
  const [posts, setPosts] = useState([]);
//getting all postes in database
//  useEffect(() => {
//   apiServices
//   .getPostListRoute()
//   .then(response=>setPosts(response.data))
  
//   console.log(response.data)
//  }, [])
  

  return (
    <div className='Main-feeds'>
      <CreatePost  />
      <Post/>
     
    </div>
  )
}

export default MainFeeds