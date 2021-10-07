import Header from "../components/header/Header";
import { useState, useEffect } from "react";
import Posts from "../components/posts/Posts";
import Sidebar from "../components/sidebar/Sidebar";
import "./blog.css";
import { apiUrl } from "../contexts/constants";
import axios from "axios";
import { useLocation } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";
import cover from "../assets/water-35.gif";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    Aos.init({ duration: 3000, delay: 30 });
    const fetchPosts = async () => {
      const res = await axios.get(`${apiUrl}/blogposts` + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      {/* <Header /> */}

      <div className="container">
        <img className="coImg" src={cover} />
        <h3 data-aos="fade-in">What's Cooking in the Kitchen?</h3>
        <h1 data-aos="fade-in">Le Blog Culinaire</h1>
      </div>

      <div data-aos="flip-up" className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
