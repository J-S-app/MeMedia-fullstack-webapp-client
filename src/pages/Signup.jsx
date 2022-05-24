import {useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiServices from '../services/APIServices'
import { AuthContext } from "../context/auth.context"


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);



  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password ,username};
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
    <div className="SignupPage">
      <h1>Register</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSignupSubmit}>
      <label>User Name:</label>
      <input
          type="text"
          name="username"
          value={username}
          required={true}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />


        <button type="submit">Sign Up</button>
      </form>

      <p>Already have account?</p>
      <Link to={"/auth/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;