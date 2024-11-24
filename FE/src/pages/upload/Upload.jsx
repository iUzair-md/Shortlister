import "./upload.scss";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";


const Upload = () => {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDropAccepted = async (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      // Start upload using axios
      const response = await axios.post("http://localhost:8000/api/files/upload", formData, {
        withCredentials: true,  
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(error.response?.data?.message || "Could not upload file.");
    }
  };


  const removeFile = (event) => {
    event.stopPropagation();
    setSelectedFile(null);
    setUploadError(null);
    setUploadProgress(0);
  };

  const readAndFetchSkills = async() =>{
    try {
       await axios.get("http://localhost:8000/api/skills/extract",{
        withCredentials:true,
      });
      navigate('/dashboard'); 
    } catch (error) {
      console.log(error)
    }

  }

  const { getRootProps, getInputProps } = useDropzone({ onDropAccepted });

  return (
    <div className="upload">
      <div className="content">
        <div className="box">
          <div className="left">
            <div>
              <h1>Upload your file</h1>
              <h2>Accepted file formats are .docx or .pdf</h2>
            </div>
          </div>
          <div className="right">
            {!selectedFile ? (
              <div className="notuploaded" {...getRootProps()}>
                <input
                  style={{ backgroundColor: "yellow", padding: "20px" }}
                  {...getInputProps()}
                />
                <p>Drag and drop your file </p>
                <p>Or</p>
                <p className="click">Click here to select </p>
              </div>
            ) : (
              <div className="uploaded">
                {uploadProgress === 100 ? (
                  <div className="success">
                    <div className="file">
                      <h1> File </h1>
                      <p> {selectedFile.name}</p>
                    </div>

                    <div className="buttons">
                      <button onClick={removeFile}>
                        <RxCross2 />  
                      </button>
                      <button onClick={readAndFetchSkills} style={{ color: "green" }}>
                        <FaArrowRightLong />
                      </button>
                    </div>
                  </div>
                ) : null}
                {/* {uploadError && <p className="error">Error: {uploadError}</p>}{" "} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;


