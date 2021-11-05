//import Dropzone from "../utils/dropzone.jsx";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { apiUrl, foodUrl } from "../contexts/constants";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./food.css";


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

  const [titles, setTitles] = useState("");
  const [desc, setDesc] = useState([]);

  const getFood = async () => {
    try {
      const res = await axios.get(`${foodUrl}/predictfood`);
      console.log(res.data);
      setTitles(res.data.title);
      console.log(res.data);

      const x = [...res.data.description];
      console.log(x)

      setDesc(x)

    } catch (error) {
      //return error.response.data;
      console.log(error.message);
    }
  };

  let body = (
    <Row>
      <Col>
        <h3
          className="text-uppercase"
          style={{ marginTop: 20, marginLeft: 20, textAlign: "center" }}
        >
          Food Prediction
        </h3>
        <hr />
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label
                  htmlFor="Fullname"
                  style={{ marginTop: 20, marginLeft: 49 }}
                >
                  <b>Hình ảnh: </b>
                </label>
              </div>
            </div>
          </div>
          <div className="text-center"></div>
        </form>
        <input
          type="file"
          id="file"
          name="file"
          className="custom-file-input"
          style={{ marginTop: 20, marginLeft: 49 }}
          onChange={handleUpload}
        />
        <div>
          {imgfile && (
            <img className="ingImg" src={URL.createObjectURL(imgfile)} alt="" />
          )}
        </div>
        <Card className="text-center mx-5 my-5 ingCol">
          <Card.Body>
            <Button variant="primary" onClick={getFood}>
              Predict
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  return (
    <>
      <Row>
        <Col>{body}</Col>
        <Col>
          <div className="sidebarIng ingCol">
            <div className="sidebarIngItem">
              <span className="sidebarIngTitle">RECIPE</span>
              <Row>
                <b className="ingTitlePredict">{titles}</b>
              </Row>
            </div>

            <div className="sidebarIngItem">
              <span className="sidebarIngTitle">DESCRIPTION</span>
              <Row>
                <p className="ingPredict">{desc}</p>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Food;
