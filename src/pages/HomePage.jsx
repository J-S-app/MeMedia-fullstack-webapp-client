import "./HomePage.css";
import MainFeeds from '../components/HomePage/MainFeeds'
import SideBarLeft from '../components/HomePage/SideBarLeft'
import SideBarRight from '../components/HomePage/SideBarRight'



function HomePage() {


  return (
    <>
      <div className="HomePage-Container">
      <SideBarLeft />
        <MainFeeds className='HomePage-item' />
        <SideBarRight className='HomePage-item' />
      </div>
    </>
  );
}

export default HomePage;
