import './ProfileFeeds.css'
import CreatePost from '../HomePage/CreatePost'
import Post from '../HomePage/Post'
import apiServices from '../../services/APIServices';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/auth.context';



const ProfileFeeds = ({userId}) => {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);


  const storedToken = localStorage.getItem("authToken");

  const callBackFeeds =()=>{
    apiServices
    .getPostListRoute({ headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => setPosts(response.data.reverse()))
    .catch(error => {
      const errorDescription = error.response.data.message;
      console.log("error getting all posts", errorDescription)
      setErrorMessage(errorDescription);
    })
  }

  //getting all postes in database
  useEffect(() => {
    callBackFeeds()

  }, [posts.postLikes])


  return (
    <>
      <div className='ProfileFeeds'>
      {user?._id == userId
      ?
      <CreatePost callBackFeeds={callBackFeeds} />
      
      :
      ''
      } 
        {posts.length > 0
          ?
          <>
            {posts
            .filter(post=> post.postOwner == userId)
            .map(post => <Post key={post._id} callBackFeeds={callBackFeeds} post={post} />)}
          </>
          : ''
        }
      </div>
    </>

  )
}

export default ProfileFeeds