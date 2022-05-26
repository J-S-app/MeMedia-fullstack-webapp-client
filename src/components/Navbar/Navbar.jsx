
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import HomeIcon from '@mui/icons-material/Home';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import apiServices from '../../services/APIServices';
import EmailIcon from '@mui/icons-material/Email';

const Navbar = ({postsSearch, callBackFeeds}) => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [userDetail, setUserDetail] = useState({});
  const [searchString, setSearchString] = useState('');
  const [posts,setPosts] = useState([])

  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }

  const CallbackGetUserDetail = () => {
    if (user) {
      apiServices
        .userDetailsRoute(user._id, header)
        .then(response => setUserDetail(response.data))
        .catch(error => {
          const errorDescription = error.response.data.message;
          console.log("error  getting user detail", errorDescription)
          setErrorMessage(errorDescription);
        })
    }
  }

  useEffect(() => {
    CallbackGetUserDetail()
    callBackFeeds()
  }, [user?._id])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchString(e.target.value)
    postsSearch(e.target.value)
  }

  return (
    <div className="Navbar-container">

      {isLoggedIn &&
        <>
          <div className="Navbar-left">
            <NavLink to='/' className="Navbar-logo">
              MeMedia
            </NavLink>
            <input 
            className='Navbar-search-bar' 
            placeholder='search for posts' 
            type='search' 
            value={searchString}
            onChange={handleSearch}
            />
          </div>

          <div className="Navbar-center">
            <NavLink to='/' >
              <HomeIcon htmlColor="white" className="Navbar-center-item" />
            </NavLink>
            <NavLink to={`/${userDetail?._id}/messages`} className="authLink">
              <EmailIcon htmlColor="white" />
            </NavLink>
            {/*        
        <NavLink to='/search'>
        <PageviewIcon htmlColor="white" className="Navbar-center-item" />
        </NavLink> */}
          </div>
          <div className="Navbar-right">
            

            <NavLink to={`/profile/${userDetail?._id}`} className="authLink">
              <img src={userDetail.profileImage || require("../../assets/placeholder.png")} className='Navbar-profile-img' />
            </NavLink>

            <button className="Navbar-logout"  onClick={logOutUser} >Logout</button>

          </div>
        </>
      }

      {!isLoggedIn &&
        <>
          <div className="Navbar-left">
            <h3 style={{ color: "white" }} className="Navbar-logo">MeMedia</h3>
          </div>
          <div className="Navbar-right">
            <NavLink to='/auth/signup' className="authLink">
              Sign up
            </NavLink>
            <NavLink to='/auth/login' className="authLink">
              Log in
            </NavLink>
          </div>
        </>
      }



    </div>
  );
};

export default Navbar;
