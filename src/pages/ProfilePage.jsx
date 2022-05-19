import './ProfilePage.css';
import MainFeeds from '../components/HomePage/MainFeeds'
import SideBarLeft from '../components/HomePage/SideBarLeft'
import SideBarRight from '../components/HomePage/SideBarRight'



const ProfilePage = () => {
  return (
    <div className="ProfilePage-container ">
      <div className='ProfilePage-left'>
        <SideBarLeft />
      </div>

      <div className='ProfilePage-right'>
        <div className='ProfilePage-right-top'>

          <div className='ProfilePage-right-top-images'>
            <img src={require('../assets/coverImage/2.jpg')} className="ProfilePage-right-top-coverimage" />
            <img src={require('../assets/profileImage/(1).jpg')} className="ProfilePage-right-top-profileimage" />
            <div className='ProfilePage-right-top-userinfo'>
            <h3 className="ProfilePage-right-top-username">XXX User Name</h3>
            <span className="ProfilePage-right-top-catchphrase">XXX CatchPhrase goes here</span>

          </div>
          </div>

          
        </div>
        <div className='ProfilePage-right-bottom'>
          <MainFeeds />

        </div>
      </div>




    </div>
  )
}

export default ProfilePage