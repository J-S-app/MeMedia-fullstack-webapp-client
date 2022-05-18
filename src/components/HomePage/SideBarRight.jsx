import './SideBarRight.css';
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';

const SideBarRight = () => {
  return (
    <div className='SideBar-right'>
      <div className='SideBar-right-container'>
        <div className='SideBar-right-birthday'>
          <CakeTwoToneIcon htmlColor='tomato' className='SideBar-right-birthday-icon' />
          <span className='SideBar-right-birthday-text'>Happy Birthday XXXX Username</span>
        </div>
        <h4 className='SideBar-right-random-meme-title'>Random Meme</h4>
        <img src={require('../../assets/memes/(12).jpg')} className="SideBar-right-random-meme" />
        <hr/>
        <h4 className='SideBar-right-online-followers-title' >Online Followers</h4>
        <div className='SideBar-right-online-followers'>
        <div className="SideBar-right-online-followers-item">
        <img src={require('../../assets/profileImage/(5).jpg')} className="SideBar-right-fallowers-image" />
        <h5 className="SideBar-right-online-followers-name">XXX User Name</h5>
      </div>
      <div className="SideBar-right-online-followers-item">
        <img src={require('../../assets/profileImage/(3).jpeg')} className="SideBar-right-fallowers-image" />
        <h5 className="SideBar-right-online-followers-name">XXX User Name</h5>
      </div>
    
        </div>
      </div>
    </div>
  )
}

export default SideBarRight