import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiServices from '../services/APIServices'
import { AuthContext } from "../context/auth.context"
import './SignupPage.css'

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);



  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, username };
    apiServices
      .registerRoute(requestBody)
      .then((response) => {
        // login successful

        const jwt = response.data.authToken;
        console.log('registration was sucessful. JWT token: ', jwt);

        storeToken(jwt);
        authenticateUser();

        navigate('/');
      })
      .catch((error) => {
        // login failed
        const errorDescription = error.response.data.message;
        console.log("registration error ...", errorDescription)
        setErrorMessage(errorDescription);
      })

  };


  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2>Register</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="login-Title">
          <h1>MeMedia</h1>
        </div>
        <form onSubmit={handleSignupSubmit}>
          <div className="login-form">
            <div className="login-form-top">
              <input
                id="username"
                placeholder="Username ..."
                className="fadeIn first"
                type="name"
                name="username"
                value={username}
                required={true}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-form-center">
              <input
                id="login"
                placeholder="Email ..."
                className="fadeIn second"
                type="email"
                name="email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-form-bottom">
              <input
                className="fadeIn third"
                type="password"
                placeholder="Password ..."
                id="password"
                name="password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="login-btn fadeIn fourth" type="submit">Sign Up</button>
        </form>
        <div id="formFooter" >
          <p>Already have account?</p>
          <Link to={"/auth/login"}>Login </Link>
        </div>

      </div>
    </div>
  )
}

export default SignupPage;