import { NavLink } from 'react-router-dom'
import './ErrorPage.css'

const ErrorPage = () => {
  return (
    <div className='ErrorPage'>

<img src={require("../assets/notFound.png")} className="ErrorPage-image" />
<NavLink to={'/'}><button className='ErrorPage-btn'>Back To Home</button></NavLink>
    </div>
  )
}

export default ErrorPage