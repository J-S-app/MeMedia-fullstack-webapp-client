import './MainFeeds.css'
import CreatePost from './CreatePost'
import Post from './Post'
import apiServices from '../../services/APIServices';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context"

const MainFeeds = () => {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn, isLoading, user } = useContext


  const storedToken = localStorage.getItem("authToken");

  //getting all postes in database
  useEffect(() => {
    apiServices
      .getPostListRoute({ headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => setPosts(response.data))
      .catch(e => console.log('error getting list of posts', e))

  }, [])


  return (
    <>
      {posts.length > 0
        ? <div className='Main-feeds'>
          <CreatePost />
          {posts.map(post=> <Post key={post._id} post={post}  />)}
         

        </div>
        : <p>is loading ....</p>
    }

    </>

  )
}

export default MainFeeds