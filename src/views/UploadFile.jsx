import React from 'react';
import DragComponent from '../components/DragComponent';
import axiosClient from "../axios-client.js";
import { useState } from "react";

const UploadFile = () => {
  const [errors, setErrors] = useState(null);
  const [files, setFiles] = React.useState([]);
  const handleUpload = () => {
    if (files.length === 0) {
      alert("Please upload a file first.");
      return;
    }

    const decodedFiles = files.map(file => JSON.parse(file.content));

    console.log("Files to be uploaded:", files);
    console.log("Decoded JSON content:", JSON.stringify(decodedFiles, null, 2));

    axiosClient.post("/jsonupdate", { files: decodedFiles })
    .then(() => {
      setErrors(null);
      alert("Archivo(s) Cargado Exitosamente.");
      setFiles([]); // Clear the files after upload
    })
    .catch((err) => {
      const response = err.response;
      if (response && response.status === 422) {
        //alert("Validation error.");
        setErrors(response.data.error);
      } else if (response && response.status === 401) {
        window.location = '/login';
      } else {
        //alert("An error occurred while uploading the file(s).");
        setErrors("An error occurred while uploading the file(s), Please Check Json Format *user Field");
      }
    });
  };
  return (
    <div className="grafana-panel">
      <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">Data Source Update</h1>
      {errors && (
                    <div className="alert">
                        {/* {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))} */}
                       <p >{errors}</p>
                    </div>
                )}
        <DragComponent setFiles={setFiles} />
        <div className="flex justify-center">  
        <button
            className="text-white  bg-primary mt-4 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={handleUpload}
        >
            UPLOAD
        </button>
        </div>
    </div>
  );
};

export default UploadFile;
