import React from 'react';
import {useDropzone} from 'react-dropzone';

function Dropzone(){
    const {acceptedFiles, getRootProps, getInputProps}= useDropzone({
        accept : "image/jpeg, image/png"
    });
    console.log(acceptedFiles)
    return(
        <>
        <div className = "d-flex justify-content-center">
            <div {...getRootProps()} className="dropzone__img">
            <input {...getInputProps()} className = "input__control"/>
            <i class="fas fa-plus">Vinh gay</i>
            </div>
        </div>
        <img className="img-fluid w-100 pb-1" src={process.env.PUBLIC_URL + `/img/${acceptedFiles[0]?.name}`}  alt=""/>
        </>
    )
}

export default Dropzone;