import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
// import { Context } from "../contexts/Context";
import { apiUrl } from "../contexts/constants";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Button from "react-bootstrap/Button";
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

  /////
  const [lifestyle, setLifeStyle] = useState(false);
  const [betterlife, setBetterLife] = useState(false);
  const [travel, setTravel] = useState(false);
  const [food, setFood] = useState(false);
  const [family, setFamily] = useState(false);
  const [happiness, setHappiness] = useState(false);

  const onChangeLifeStyle = () => {
    setLifeStyle((lifestyle) => !lifestyle);
  };
  const onChangeBetterLife = () => {
    setBetterLife((betterlife) => !betterlife);
  };
  const onChangeTravel = () => {
    setTravel((travel) => !travel);
  };
  const onChangeFood = () => {
    setFood((food) => !food);
  };

  const onChangeFamily = () => {
    setFamily((family) => !family);
  };

  const onChangeHappiness = () => {
    setHappiness((happiness) => !happiness);
  };

  /////

  const handleSubmit = async (e) => {
    e.preventDefault();

    let categories = [];

    if (lifestyle) {
      categories.push("LifeStyle");
    }
    if (betterlife) {
      categories.push("BetterLife");
    }
    if (travel) {
      categories.push("Travel");
    }
    if (food) {
      categories.push("Food");
    }
    if (family) {
      categories.push("Family");
    }
    if (happiness) {
      categories.push("Happiness");
    }

    const newPost = {
      username: username,
      title,
      desc,
      categories,
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
            <input
              className="inputBox"
              type="checkbox"
              name="LifeStyle"
              checked={lifestyle}
              onChange={onChangeLifeStyle}
            />
            LifeStyle&nbsp;&nbsp;
            <input
              className="inputBox"
              type="checkbox"
              name="BetterLife"
              checked={betterlife}
              onChange={onChangeBetterLife}
            />
            BetterLife&nbsp;&nbsp;
            <input
              className="inputBox"
              type="checkbox"
              name="Travel"
              checked={travel}
              onChange={onChangeTravel}
            />
            Travel&nbsp;&nbsp;
            <input
              className="inputBox"
              type="checkbox"
              name="Food"
              checked={food}
              onChange={onChangeFood}
            />
            Food&nbsp;&nbsp;
            <input
              className="inputBox"
              type="checkbox"
              name="Family"
              checked={family}
              onChange={onChangeFamily}
            />
            Family&nbsp;&nbsp;
            <input
              className="inputBox"
              type="checkbox"
              name="Happiness"
              checked={happiness}
              onChange={onChangeHappiness}
            />
            Happiness&nbsp;&nbsp;
          </Row>
        </Col>
      </form>
    </div>
  );
}
