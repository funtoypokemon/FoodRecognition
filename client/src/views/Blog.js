import Header from "../components/header/Header";
import { useState, useEffect } from "react";
import Posts from "../components/posts/Posts";
import Sidebar from "../components/sidebar/Sidebar";
import "./blog.css";
import { apiUrl } from "../contexts/constants";
import axios from "axios";
import { useLocation } from "react-router";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${apiUrl}/blogposts` + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
