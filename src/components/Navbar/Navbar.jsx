
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
   
     
    </div>
  );
};

export default Navbar;
