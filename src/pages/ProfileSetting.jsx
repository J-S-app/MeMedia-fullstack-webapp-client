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
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [clickState, setClickState] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);


  const storedToken = localStorage.getItem("authToken");
  const header = { headers: { Authorization: `Bearer ${storedToken}` } }



  useEffect(() => {

    apiServices
      .userDetailsRoute(userId, header)
      .then((response) => {
        const { username, birthday, country, catchPhrase, aboutMeme, coverImage, profileImage } = response.data;
        setUsername(username);
        setBirthday(birthday);
        setCountry(country);
        setCatchPhrase(catchPhrase);
        setAboutMeme(aboutMeme);
        setCoverImage(coverImage);
        setProfileImage(profileImage);
        setValidationMessage()

      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("error getting user detail", errorDescription)
        setErrorMessage(errorDescription);
      })
  }, [userId]);



  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, birthday, country, catchPhrase, aboutMeme, coverImage, profileImage };

    apiServices
      .updateUserRoute(userId, requestBody, header)
      .then(response => {
        console.log('Response of Update user', response)
        navigate(`/profile/${userId}`)
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log("error updating user profile", errorDescription)
        setErrorMessage(errorDescription);
      })
  };

  function showUploadWidgetForCover(e) {
    e.preventDefault()
    cloudinary.openUploadWidget({
      cloudName: "memediacloud",
      uploadPreset: "rgly7uw1",
      sources: ["local", "url", "camera", "image_search", "facebook", "dropbox", "instagram", "getty", "istock"],
      googleApiKey: "<image_search_google_api_key>",
      showAdvancedOptions: true,
      cropping: true,
      multiple: false,
      // folder: "user_images", 
      tags: ["meme", "lol"],
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      // theme: "purple", //change to a purple theme
      defaultSource: "local",
      styles: {
        palette: {
          window: "#FFFFFF",
          windowBorder: "#90A0B3",
          tabIcon: "#0078FF",
          menuIcons: "#5A616A",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link: "#0078FF",
          action: "#FF620C",
          inactiveTabIcon: "#0E2F5A",
          error: "#F44235",
          inProgress: "#0078FF",
          complete: "#20B832",
          sourceBg: "#E4EBF1"
        },
        fonts: {
          default: null,
          "'Fira Sans', sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Fira+Sans",
            active: true
          }
        }
      }
    }, (err, result) => {
      if (!err && result && result.event === "success") {
        // console.log("Upload Widget event - ", info);
        // console.log(result.info.secure_url)
        setCoverImage(result.info.secure_url)
        setValidationMessage("Click on Upload profile  to validate image changes")
      }
    });
  }

  function showUploadWidgetForProfile(e) {
    e.preventDefault()
    cloudinary.openUploadWidget({
      cloudName: "memediacloud",
      uploadPreset: "rgly7uw1",
      sources: ["local", "url", "camera", "image_search", "facebook", "dropbox", "instagram", "getty", "istock"],
      googleApiKey: "<image_search_google_api_key>",
      showAdvancedOptions: true,
      cropping: true,
      multiple: false,
      // folder: "user_images", 
      tags: ["meme", "lol"],
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      // theme: "purple", //change to a purple theme
      defaultSource: "local",
      styles: {
        palette: {
          window: "#FFFFFF",
          windowBorder: "#90A0B3",
          tabIcon: "#0078FF",
          menuIcons: "#5A616A",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link: "#0078FF",
          action: "#FF620C",
          inactiveTabIcon: "#0E2F5A",
          error: "#F44235",
          inProgress: "#0078FF",
          complete: "#20B832",
          sourceBg: "#E4EBF1"
        },
        fonts: {
          default: null,
          "'Fira Sans', sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Fira+Sans",
            active: true
          }
        }
      }
    }, (err, result) => {
      if (!err && result && result.event === "success") {
        // console.log("Upload Widget event - ", info);
        // console.log(result.info.secure_url)
        setProfileImage(result.info.secure_url)
        setValidationMessage("Click on submit to validation image change")
      }
    });
  }

  return (
    <div className='ProfileSetting-container '>
      <h3 className='ProfileSetting-page-name'>Profile Setting</h3>
      <div >
        <form onSubmit={handleFormSubmit} className='ProfileSetting-info-container'>


          <div className='ProfileSetting-right-top-images'>
            <img
              src={coverImage || require("../assets/coverimage-placeholder.jpg")}
              className="ProfileSetting-right-top-coverimage"
              onClick={showUploadWidgetForCover}
            />
            <img
              src={profileImage || require("../assets/placeholder.png")}
              className="ProfileSetting-right-top-profileimage"
              onClick={showUploadWidgetForProfile}
            />
          </div>

          {validationMessage && <p className='ProfileSettings-image-validation-message'>Click on submit to validation image change</p>}

          <div className='ProfileSetting-right-top-username'>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='ProfileSetting-input-text'
            />
          </div>
          <div className='ProfileSetting-right-top-country'>
            <label>Country :</label>
            <input
              type="text"
              name="username"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className='ProfileSetting-input-text'
            />
          </div>
          <div className='ProfileSetting-right-top-country'>
            <label for="birthday">Birthday: </label>
            <input type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              name="birthday"
              className='ProfileSetting-right-top-calendar'
            />

          </div>
          <div className='ProfileSetting-right-top-catchphrase'>
            <label>Catch Phrase:</label>
            <textarea
              name="catchPhrase"
              value={catchPhrase}
              onChange={(e) => setCatchPhrase(e.target.value)}
              className='ProfileSetting-input-textarea'
            />
          </div>
          <div className='ProfileSetting-right-top-About'>
            <label>Aboute Meme :</label>
            <textarea
              name="aboutMeme"
              value={aboutMeme}
              onChange={(e) => setAboutMeme(e.target.value)}
              className='ProfileSetting-input-textarea'
            />
          </div>

          <button type="submit" className='ProfileSetting-submit'>Update Profile</button>
        </form>
      </div>
    </div>
  )
}

export default ProfileSetting;



