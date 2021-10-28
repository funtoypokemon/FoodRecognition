import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../contexts/constants";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`${apiUrl}/categories`);
      setCats(res.data);
    };
    getCats();
  }, []);
  console.log(cats);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">GREETINGS</span>
        <img className="myImg" alt="" />
        <p className="forP">
          Eat clean and diversity kind of organic food is how you protect your
          health. Protect your health is that you are protecting your family. So
          welcome to my blog. Hopefully, you will find the best recipe for your
          family. Wish all the best for you.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c, index) => (
            // <Link to={`${apiUrl}/?cat=${c.name}`} className="link">
            <Link key={index} to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
