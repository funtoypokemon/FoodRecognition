import "./post.css";
import { Link } from "react-router-dom";
import { apiUrl } from "../../contexts/constants";

export default function Post({ post }) {
  const PF = `${apiUrl}/images/`;
  const cate = post.categories;

  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
      <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <div className="postCats">
          {cate.map((c, index) => (
            <span key={index} className="postCat">
              {c}
            </span>
          ))}

        </div>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
    // <div className="card">
    //   <div className="cardbody">
    //     {post.photo && <img class="__image" src={PF + post.photo} alt="" />}
    //     <span className="postDate">
    //       {new Date(post.createdAt).toDateString()}
    //     </span>
    //     <h2 className="__title">{post.title}</h2>
    //     <p className="__description">{post.desc}</p>
    //   </div>
    //   <button className="__btn">View Recipe</button>
    // </div>
  );
}
