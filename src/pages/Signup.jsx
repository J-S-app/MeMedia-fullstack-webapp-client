import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiServices from '../services/APIServices'


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };
    apiServices
      .registerRoute(requestBody)
      .then((response) => {
        // login successful


        navigate('/');
      })
      .catch((error) => {
        // login failed
        const errorDescription = error.response.data;
        console.log("error loggin in...", errorDescription)
        setErrorMessage(errorDescription);
      })

  };


  return (
    <div className="SignupPage">
      <h1>Register</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSignupSubmit}>
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
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;