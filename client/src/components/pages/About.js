import React, { useContext } from "react";
import { Context } from "../../index";

const About = () => {
  const { mode } = useContext(Context);
  return (
    <div className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
        <div className="btn">
          <button>About Vaghela's Blog</button>
        </div>
        <p>
          Welcome to Digvijay's Blog! This platform, created by Digviajay, a
          dedicated developer, serves as a personal space to share insights,
          stories, and ideas with a global audience.
        </p>
        <p>
          Digvijaysinh, a passionate tech enthusiast, offers weekly insights
          into the world of web development, software design, and programming
          languages. Embark on a journey with him to explore innovative
          technologies and embrace continuous learning.
        </p>
        <p>
          Join the conversation by sharing your thoughts in the comments
          section. Engage with fellow readers by liking and replying to their
          comments, creating a collaborative space for shared learning and
          growth.
        </p>
      </div>
    </div>
  );
};

export default About;
