import { useContext, useState, useEffect } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../contexts/Context";
import { apiUrl, hostUrl } from "../contexts/constants";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post(`${apiUrl}/upload`, data);
      } catch (err) {}
    }
    try {
      const res = await axios.post(`${apiUrl}/blogposts`, newPost);
      window.location.replace(`/post/` + res.data._id); 
    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <Col>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon">
                <FontAwesomeIcon icon="plus" color="#3a3a3a" />
              </i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              placeholder="Tell us your story..."
              type="text"
              className="writeInput writeText"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
        </Col>
        <Col>
          <Row>
            <button className="writeSubmit" type="submit">
              Publish
            </button>
          </Row>
          <Row className="publishCol">
            <input className="inputBox" type="checkbox" name="LifeStyle" />
            LifeStyle&nbsp;&nbsp;
            <input className="inputBox" type="checkbox" name="BetterLife" />
            BetterLife&nbsp;&nbsp;
            <input className="inputBox" type="checkbox" name="Travel" />
            Travel&nbsp;&nbsp;
            <input className="inputBox" type="checkbox" name="Food" />
            Food&nbsp;&nbsp;
            <input className="inputBox" type="checkbox" name="Family" />
            Family&nbsp;&nbsp;
            <input className="inputBox" type="checkbox" name="Happiness" />
            Happiness&nbsp;&nbsp;
          </Row>
        </Col>
      </form>
    </div>
  );
}
