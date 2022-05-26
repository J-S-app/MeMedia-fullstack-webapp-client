import './ProfileFeeds.css'
import CreatePost from '../HomePage/CreatePost'
import Post from '../HomePage/Post'
import apiServices from '../../services/APIServices';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/auth.context';



const ProfileFeeds = ({ userId , postsList ,callBackFeeds}) => {
  // const [posts, setPosts] = useState('');
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const storedToken = localStorage.getItem("authToken");

  //getting all postes in database
  useEffect(() => {
    callBackFeeds()
  }, []) 

  return (
    <>
      <div className='ProfileFeeds'>
        {userId &&
          <>
            {user?._id == userId
              ?
              <CreatePost  callBackFeeds={callBackFeeds}/>

              :
              ''
            }
            {postsList?.length > 0
              ?
              <>
                {postsList
                  .filter(post => post.postOwner == userId)
                  .map(post => <Post key={post._id} post={post} callBackFeeds={callBackFeeds}/>)}
              </>
              : ''
            }
          </>
        }
        {!userId
          ?
          <>
            <CreatePost callBackFeeds={callBackFeeds} />
            {postsList?.length > 0
              ?
              <>
                {postsList.map(post => <Post key={post._id} post={post} callBackFeeds={callBackFeeds}/>)}
              </>
              : ''
            }
          </>
          :
          ""
        }

      </div>
    </>

  )
}

export default ProfileFeeds