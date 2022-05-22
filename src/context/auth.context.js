import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        authenticateUser();
    }, []);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }


    const authenticateUser = () => {

        const storedToken = localStorage.getItem('authToken');

        // If the token exists in the localStorage
        if (storedToken) {
            // We must send the JWT token in the request's "Authorization" Headers
            axios.get(
                `${process.env.REACT_APP_API_URL}/auth/verify`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
                .then((response) => {
                    // If the server verifies that JWT token is valid  
                    const user = response.data;
                    // Update state variables        
                    storeLoginDetails(user)
                })
                .catch((error) => {
                    // If the server sends an error response (invalid token) 
                    // Update state variables         
                    resetLoginDetails()
                });
        } else {
            // If the token is not available (or is removed)
            resetLoginDetails()
        }
    }

    const removeToken = () => {
        localStorage.removeItem("authToken");
    }


    const logOutUser = () => {
        removeToken();
        authenticateUser();
        navigate('/auth/login')
    }


    const resetLoginDetails = () => {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
    }

    const storeLoginDetails = (userDetails) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(userDetails);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };