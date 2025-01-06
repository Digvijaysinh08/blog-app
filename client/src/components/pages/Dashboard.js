import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { Navigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import MyBlogs from "../miniComponents/MyBlogs";
import MyProfile from "../miniComponents/MyProfile";
import CreateBlog from "../miniComponents/CreateBlog";

const Dashboard = () => {
  const [component, setComponent] = useState("MyBlogs");
  const { mode, isAuthenticated, user } = useContext(Context);

  if (!isAuthenticated || user.role === "Reader") {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : (
        <MyBlogs />
      )}
    </section>
  );
};

export default Dashboard;
