import Axios from "axios";
import { useState } from "react";
import Alert from './Alert';
import CreatePost from '../HomePage/CreatePost'
import apiServices from '../../services/APIServices';




const Upload = ({ callBackFeeds }) => {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [content, setContent] = useState('')

    const storedToken = localStorage.getItem("authToken");

    const header = { headers: { Authorization: `Bearer ${storedToken}` } }


    let uploadedContent = content;

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = () => {

        const formData = new FormData();
        formData.append("file", selectedFile)
        formData.append("upload_preset", "rgly7uw1")

        Axios.post("https://api.cloudinary.com/v1_1/memediacloud/image/upload", formData)
            .then(response => {
                console.log(response.data.secure_url)
                // uploadedContent = `${response.data.secure_url}`
                setContent(response.data.secure_url)
                setFileInputState('');
                setPreviewSource('');
                setSuccessMsg('Image uploaded successfully');
                // setContent('');
            })
            .catch(e => {
                console.log("error uploading content to cloudinary", e)
            })
    }

    function showUploadWidget() {
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
                console.log(result.info.secure_url)
                console.log(result.info.public_id)
            }
        });
    }

    const handleDiscard = (e) => {
        e.preventDefault()

        apiServices
            .destroyCloudinaryItem("dr-strange_pfrape", header)
            .then(response => {
                console.log(response.data)
                setPostContentForCD('')
            })
            .catch(e => {
                console.log("destroy item into cloudinary failed", e)
            })
    }


    return (
        <div>
            {/* <CreatePost callBackFeeds={callBackFeeds} uploadedContent={uploadedContent} /> */}
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <button className='CreatePost-submit' type="submit">
                    Submit a Meme
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ maxHeight: '300px' }}
                />

            )}
            <div>
                <button onClick={showUploadWidget}>Upload</button>
            </div>
            <button onClick={handleDiscard} className="CreatePost-submit">Discard</button>


        </div>
    )
}

export default Upload
