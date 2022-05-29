import './WhoLikedPage.css'
import { useParams } from 'react-router-dom'
import apiServices from '../services/APIServices';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


const WhoLikedPage = () => {
  const { postId } = useParams()
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [postDetail, setPostDetail] = useState({})


  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }



  const GettingOnePostDetail = () => {
    apiServices
      .getOnePostRoute(postId, header)
      .then(response => setPostDetail(response.data))
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("error getting post detail ", errorDescription)
        setErrorMessage(errorDescription);
      })
  }

  useEffect(() => {
    GettingOnePostDetail()
  }, []);

  return (
    <>
    <h1 style={{textAlign: "start" , marginLeft : "80px"}}>Who likes this post</h1>
    <div className='WhoLikedPage'>
      {postDetail?.postLikes?.length > 0 &&
        postDetail?.postLikes?.map(like => {
          return (
            <div className='WhoLikedPage-container'>

              <NavLink to={`/profile/${like?._id}`}>
                <div key={like?._id} className="WhoLikedPage-fallowers-list">
                  <img src={like?.profileImage || require("../assets/placeholder.png")} className='WhoLikedPage-profile-img' />
                  <span className='WhoLikedPage-username'>{like?.username}</span>
                </div>
              </NavLink>

            </div>
          )
        })
      }
    </div>
    </>
  )
}

export default WhoLikedPage