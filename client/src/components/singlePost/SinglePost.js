import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { hostUrl, apiUrl } from "../../contexts/constants";
import "./singlePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

export default function SinglePost() {
  const location = useLocation();

  //const path = location.pathname.split("/")[2];
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const PF = `${apiUrl}/images/`;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${apiUrl}/blogposts/` + postId);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/blogposts/${post._id}`, {
        data: { username: username },
      });
      window.location.replace("/"); //Wrong path?
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${apiUrl}/blogposts/${post._id}`, {
        username: username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === username && (
              <div className="singlePostEdit">
                <Button
                  className="singlePostIcon"
                  onClick={() => setUpdateMode(true)}
                >
                  <FontAwesomeIcon icon="edit" color="#ffffff" />
                </Button>
                <Button
                  className="singlePostIcon"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon="trash" color="#ffffff" />
                </Button>
                {/* <i
                  className="singlePostIcon fas fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fas fa-trash"
                  
                ></i> */}
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              {/* Wrongpath? */}
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
