import "./SideBarLeft.css";
import { NavLink } from "react-router-dom";



const SideBarLeft = () => {
  return (
    <div className="SideBar-left">
      <div className="SideBar-left-title">
        <h4>Friends </h4>
        <NavLink to='/foloowers-list'>See All</NavLink>
      </div>
      
      <div className="SideBar-left-fallowers-list">
        <img src={require('../../assets/profileImage/(1).jpg')} className="SideBar-left-fallowers-image" />
        <h5 className="SideBar-left-followers-name">XXX User Name</h5>
      </div>
      <div className="SideBar-left-fallowers-list">
        <img src={require('../../assets/profileImage/(2).jpg')} className="SideBar-left-fallowers-image" />
        <h5 className="SideBar-left-followers-name">XXX User Name</h5>
      </div>
      <div className="SideBar-left-fallowers-list">
        <img src={require('../../assets/profileImage/(8).jpg')} className="SideBar-left-fallowers-image" />
        <h5 className="SideBar-left-followers-name">XXX User Name</h5>
      </div>
      <div className="SideBar-left-fallowers-list">
        <img src={require('../../assets/profileImage/(10).jpg')} className="SideBar-left-fallowers-image" />
        <h5 className="SideBar-left-followers-name">XXX User Name</h5>
      </div>
      <div className="SideBar-left-fallowers-list">
        <img src={require('../../assets/profileImage/(11).jpg')} className="SideBar-left-fallowers-image" />
        <h5 className="SideBar-left-followers-name">XXX User Name</h5>
      </div>
    </div>
  )
}

export default SideBarLeft