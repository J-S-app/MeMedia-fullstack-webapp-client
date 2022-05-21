import "./HomePage.css";
import MainFeeds from '../components/HomePage/MainFeeds'
import SideBarLeft from '../components/HomePage/SideBarLeft'
import SideBarRight from '../components/HomePage/SideBarRight'
import apiServices from '../services/APIServices';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context"



function HomePage() {
  const [followingsList, setFollowingsList] = useState([])
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);



  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }

  const callBackFollowingList = () => {
    if (user) {
      apiServices
        .getFollowingsRoute(user._id, header)
        .then(followingList => {
          setFollowingsList(followingList.data)
          console.log('Following LISTTTTT',followingList.data)
      })
        .catch(error => {
          const errorDescription = error.response.data.message;
          console.log("error getting all followings", errorDescription)
          setErrorMessage(errorDescription);
        })

    }
  }
  useEffect(() => {
    callBackFollowingList()
  }, [])







  return (
    <>
      <div className="HomePage-Container">
      <SideBarLeft followingsList={followingsList} callBackFollowingList={callBackFollowingList} />
        <MainFeeds className='HomePage-item' />
        <SideBarRight className='HomePage-item' />


      </div>
    </>
  );
}

export default HomePage;
