import './ProfileSetting.css'
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiServices from '../services/APIServices';


const ProfileSetting = () => {
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [aboutMeme, setAboutMeme] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);


  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }



  useEffect(() => {

    apiServices
    .userDetailsRoute(userId,header)
    .then((response) => {
      const {username,birthday,country,catchPhrase,aboutMeme } = response.data;
      setUsername(username);
      setBirthday(birthday);
      setCountry(country);
      setCatchPhrase(catchPhrase);
      setAboutMeme(aboutMeme);

    })
    .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("error getting user detail", errorDescription)
        setErrorMessage(errorDescription);
      })

    
     
  }, [userId]);



  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {username,birthday,country,catchPhrase,aboutMeme };
   
    apiServices
    .updateUserRoute(userId,requestBody,header)
    .then(response=>{
      console.log('Response of Update user',response)
      navigate(`/profile/${userId}`)
    })
    .catch(error => {
      const errorDescription = error.response.data.message;
      console.log("error updating user profile", errorDescription)
      setErrorMessage(errorDescription);
    })
        

     

  };




  return (
    <div className='ProfileSetting-container'>
      <h3>Profile Setting</h3>

      <form onSubmit={handleFormSubmit}>

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>country :</label>
        <input
          type="text"
          name="username"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />


        <label for="birthday">Birthday:</label>
        <input type="date" 
        id="birthday" 
        value={birthday} 
        onChange={(e) => setBirthday(e.target.value)}
        name="birthday"/>


        <label>Catch Phrase:</label>
        <textarea
          name="catchPhrase"
          value={catchPhrase}
          onChange={(e) => setCatchPhrase(e.target.value)}
        />


        <label>Aboute Meme :</label>
        <textarea
          name="aboutMeme"
          value={aboutMeme}
          onChange={(e) => setAboutMeme(e.target.value)}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  )
}

export default ProfileSetting;



