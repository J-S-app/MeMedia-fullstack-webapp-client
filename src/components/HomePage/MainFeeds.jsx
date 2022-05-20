import './MainFeeds.css'
import CreatePost from './CreatePost'
import Post from './Post'
import apiServices from '../../services/APIServices';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context"

const MainFeeds = () => {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn, isLoading, user } = useContext
  const [errorMessage, setErrorMessage] = useState(undefined);


  const storedToken = localStorage.getItem("authToken");

  const callBackFeeds =()=>{
    apiServices
    .getPostListRoute({ headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => setPosts(response.data.reverse()))
    .catch(error => {
      const errorDescription = error.response.data.errorMessage;
      console.log("error getting all posts", errorDescription)
      setErrorMessage(errorDescription);
    })
  }

  //getting all postes in database
  useEffect(() => {
    callBackFeeds()

  }, [])


  return (
    <>
      <div className='Main-feeds'>
        <CreatePost callBackFeeds={callBackFeeds} />
        {posts.length > 0
          ?
          <>
            {posts.map(post => <Post key={post._id} callBackFeeds={callBackFeeds} post={post} />)}
          </>
          : ''
        }
      </div>
    </>

  )
}

export default MainFeeds