import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Navbar from "./components/Navbar/Navbar";
import LogIn from "./pages/LogIn";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";
import FollowingList from "./pages/FollowingList";
import ProfileSetting from "./pages/ProfileSetting";
import FollowersList from "./pages/FollowersList";
import Messages from "./pages/Messages";
import ErrorPage from "./pages/ErrorPage";
import IsPrivate from './components/IsPrivate'
import IsAnon from "./components/IsAnon";
import apiServices from "./services/APIServices"
import { AuthContext } from "./context/auth.context"


function App() {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const [posts, setPosts] = useState([])

  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }

  useEffect(() => {
    callBackFeeds()
  }, [])

  const callBackFeeds = () => {
    apiServices
      .getPostListRoute(header)
      .then(response => {
        setPosts(response.data.reverse())

      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("error getting all posts", errorDescription)
        setErrorMessage(errorDescription);
      })
  }

  const postsSearch = (searchString) => {
    const newPostList = ( searchString === '' ? posts : posts?.filter(singlePost => singlePost.title?.toLowerCase().includes(searchString.toLowerCase()) || singlePost.postOwner?.username?.toLowerCase().includes(searchString.toLowerCase())))
    setPosts(newPostList)
  }

  return (
    <div className="App">
      <Navbar postsSearch={postsSearch} callBackFeeds={callBackFeeds} />
      <Routes>

        <Route path='/' element={<IsPrivate> <HomePage callBackFeeds={callBackFeeds} postsList={posts} /></IsPrivate>} />
        <Route path='/auth/login' element={<IsAnon><LogIn /></IsAnon>} />
        <Route path='/auth/signup' element={<IsAnon><Signup /></IsAnon>} />
        <Route path='/profile/:userId' element={<IsPrivate> <ProfilePage postsList={posts} callBackFeeds={callBackFeeds}/></IsPrivate>} />
        <Route path='/profile/:userId/setting' element={<IsPrivate> <ProfileSetting /></IsPrivate>} />
        <Route path='/editpost/:postId' element={<IsPrivate> <EditPost /></IsPrivate>} />
        <Route path='/:userId/followings' element={<IsPrivate> <FollowingList /></IsPrivate>} />
        <Route path='/:userId/followers' element={<IsPrivate> <FollowersList /></IsPrivate>} />
        <Route path='/:userId/messages' element={<IsPrivate> <Messages /></IsPrivate>} />
        <Route path="*" exact={true} element={<ErrorPage />} />

      </Routes>
    </div>
  );
}

export default App;
