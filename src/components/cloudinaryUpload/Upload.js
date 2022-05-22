import Axios from "axios";
import { useState } from "react";
import Alert from './Alert';
import CreatePost from '../HomePage/CreatePost'



const Upload = ({callBackFeeds}) => {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [content,setContent] = useState('')

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
            .catch(e =>{
                console.log("error uploading content to cloudinary", e)
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

        </div>
    )
}

export default Upload;
