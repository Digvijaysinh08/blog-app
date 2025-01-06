import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const { mode, user, isAuthenticated } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const { data } = await axios.get(
          `https://blog-app-digvijaysinh08s-projects.vercel.app/blog/singleblog/${id}`,
          { withCredentials: true }
        );
        setBlog(data.blog);
      } catch (error) {
        setBlog({});
      }
    };
    getSingleBlog();
  }, [id]); 
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <article
      className={mode === "dark" ? "dark-bg singleBlog" : "light-bg singleBlog"}
    >
      {blog && (
        <section className="container">
          <h1>{blog.title}</h1>
          <div className="category">{blog.category}</div>
          {blog?.mainImage?.url && (
            <img
              src={blog.mainImage.url}
              alt="mainBlogImg"
              className="mainImg"
            />
          )}
          <p className="intro-text">{blog.intro}</p>
          <div className="sub-para">
            <h3>{blog.paraOneTitle}</h3>
            {blog?.paraOneImage?.url && (
              <img src={blog.paraOneImage.url} alt="paraOneImg" />
            )}
            <p>{blog.paraOneDescription}</p>
          </div>
          <div className="sub-para">
            <h3>{blog.paraTwoTitle}</h3>
            {blog?.paraTwoImage?.url && (
              <img src={blog.paraTwoImage.url} alt="paraTwoImg" />
            )}
            <p>{blog.paraTwoDescription}</p>
          </div>
          <div className="sub-para">
            <h3>{blog.paraThreeTitle}</h3>
            <p>{blog.paraThreeDescription}</p>
            {blog?.paraThreeImage?.url && (
              <img src={blog.paraThreeImage.url} alt="paraThreeImg" />
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default SingleBlog;
