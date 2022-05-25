import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import apiServices from '../services/APIServices'
import { AuthContext } from "../context/auth.context"
import './SignupPage.css'

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);


  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };
    apiServices
      .loginRoute(requestBody)
      .then((response) => {
        // login successful

        const jwt = response.data.authToken;
        console.log('Login was sucessful. JWT token: ', jwt);

        storeToken(jwt);
        authenticateUser();

        navigate('/');
      })
      .catch((error) => {
        // login failed
        const errorDescription = error.response.data.message;
        console.log("error loggin in...", errorDescription)
        setErrorMessage(errorDescription);
      })


  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2>Login</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="login-Title">
          <h1>MeMedia</h1>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className="login-form">
            <div className="login-form-top">
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
                placeholder="Password ..."
                type="password"
                name="password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="login-btn fadeIn fourth" type="submit">Login</button>
        </form>

        <div id="formFooter" >
        <p>Don't have an account yet?</p>
        <Link to={"/auth/signup"}> Register</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;