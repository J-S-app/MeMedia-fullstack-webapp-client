import "./SideBarLeft.css";
import { NavLink } from "react-router-dom";



const SideBarLeft = ({ followingsList }) => {

  return (
    <div className="SideBar-left">
      <div className="SideBar-left-title">
        <h4>Friends </h4>
        {/* <NavLink to='/folowers-list'>See All</NavLink> */}
      </div>


      {followingsList.length > 0
        ?
        followingsList.map(following => {
          return (
            <>
              <div key={following._id} className="SideBar-left-fallowers-list">
                <img src={following.profileImage || require("../../assets/placeholder.png")} className="SideBar-left-fallowers-image" />
                <h5 className="SideBar-left-followers-name">{following.email}</h5>
              </div>
            </>
          )
        })
        :
        ""
      }
    </div>
  )
}

export default SideBarLeft