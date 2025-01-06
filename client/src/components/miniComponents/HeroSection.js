import React, { useContext } from "react";
import { Context } from "../../index";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const HeroSection = () => {
  return (
    <section className="hero">
      <h1>Welcome to my Blog</h1>
      <div className="container">
        <p>
          Explore the world of web development, software engineering, and
          programming languages with our collection of articles and tutorials.
          Learn coding in depth.
        </p>
        <span>
        Discover innovation and technology through our extensive resources designed just for you.
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
