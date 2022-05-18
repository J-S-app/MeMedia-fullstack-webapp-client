import './MainFeeds.css'
import CreatePost from './CreatePost'
import Post from './Post'

const MainFeeds = () => {
  return (
    <div className='Main-feeds'>
      <CreatePost  />
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </div>
  )
}

export default MainFeeds