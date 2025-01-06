import React, { useContext } from "react";
import HeroSection from "../miniComponents/HeroSection"; 
import RecentBlogs from "../miniComponents/RecentBlogs";
import { Context } from "../../index";



const Home = () => {
  const {mode} = useContext(Context);
  return (
    <>
      <article className = {mode === "dark" ? "dark-bg" : "light-bg"}>
        <HeroSection />
        <RecentBlogs />
      </article>
    </>
  );
};

export default Home;
