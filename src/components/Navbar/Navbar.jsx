
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import HomeIcon from '@mui/icons-material/Home';
import PageviewIcon from '@mui/icons-material/Pageview';


const Navbar = () => {
  return (
    <div className="Navbar-container">
      <div className="Navbar-left">
        <NavLink to='/' className="Navbar-logo">
          J&S
        </NavLink>
        <input className ='Navbar-search-bar' placeholder='search for posts' type='search'/>
      </div>

      <div className="Navbar-center">
        <HomeIcon htmlColor="white" className="Navbar-center-item" />
        <PageviewIcon htmlColor="white" className="Navbar-center-item" />
      </div>

      <div className="Navbar-right">


       {/* We need to add condition if user is login shows this part  */}
{/*          
          <button className="Nav-logoutbtn">Logout</button>
            <NavLink to='/' className="authLink">
              <img src={require("../../assets/profileImage/a.jpeg")} className='Navbar-profile-img' />
            </NavLink>
             */}

          
            <NavLink to='/auth/signup' className="authLink">
              Sign up
            </NavLink>
            <NavLink to='/auth/login' className="authLink">
              Log in
            </NavLink>
        
      
      </div>
   
     
    </div>
  );
};

export default Navbar;
