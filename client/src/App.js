import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Blogs from "./components/pages/Blogs";
import Register from "./components/pages/Register";
import SingleBlog from "./components/pages/SingleBlog";
import About from "./components/pages/About";
import AllAuthors from "./components/pages/AllAuthors";
import Dashboard from "./components/pages/Dashboard";
import UpdateBlog from "./components/pages/UpdateBlog";
import { useContext, useEffect } from "react";
import { Context } from "./index";
import axios from "axios";

function App() {
  const { setUser, isAuthenticated, setIsAuthenticated, user, setBlogs } =
    useContext(Context);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get("https://back-blog-app.vercel.app/user/myprofile", {
            withCredentials: true, 
          });
          console.log("User data:", response.data);
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching user profile:", error.response?.data || error.message);
          setIsAuthenticated(false);
          setUser(null);
        }
      };
      
      const fetchBlogs = async () => {
        try {
          const { data } = await axios.get(
            "https://back-blog-app.vercel.app/blog/allblog",
            { withCredentials: true }
          );
          console.log("Fetched blogs:", data.allBlogs);
          setBlogs(data.allBlogs);
        } catch (error) {
          console.error("Error fetching blogs:", error);
          setBlogs([]);
        }
      };
      fetchUser();
      fetchBlogs();
    }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/authors" element={<AllAuthors />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog/update/:id" element={<UpdateBlog />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
