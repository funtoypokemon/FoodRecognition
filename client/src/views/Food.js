import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { apiUrl, pythonUrl } from "../contexts/constants";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Food = () => {

    const [imgfile, setImgFile] = useState(null);
    const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      setImgFile(e.target.files[0]);
      console.log(file);
      var formData = new FormData();
      console.log(formData);

      formData.append("file", file);
      var options = { content: formData };

      console.log(options);
      const res = await axios.post(`${apiUrl}/posts/uploads`, formData, {
        headers: { "content-type": "multipart/form-data" },
      });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

    return (
        <div>
            
        </div>
    )
}

export default Food


