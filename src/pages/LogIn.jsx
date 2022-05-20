import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import apiServices from '../services/APIServices'
import { AuthContext } from "../context/auth.context"


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
        <div className="LoginPage">
            <h1>Login</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleLoginSubmit}>
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

                <button type="submit">Login</button>
            </form>


            <p>Don't have an account yet?</p>
            <Link to={"/auth/signup"}> Sign Up</Link>

        </div>
    )
}

export default LoginPage;