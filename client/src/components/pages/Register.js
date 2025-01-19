import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const { mode, isAuthenticated } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const changeAvatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("avatar", avatar);

    try {
      const { data } = await axios.post(
        "https://back-blog-app.vercel.app/user/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setEducation("");
      setAvatar("");
      setAvatarPreview("");
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          
          <div>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="Password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Reader">Reader</option>
            <option value="Author">Author</option>
          </select>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option value="">Select Your Education</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Graducation">Graducation</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
          <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}>
            <div className="avatar">
              <img src={avatarPreview ? `${avatarPreview}` : "/pic.jpg"} alt="avatar"/>
            </div>
            <input type="file"
            onChange={changeAvatarHandler}
            className="avatar_input_tag"
            style={{ border: "none" }}
            />
          </div>
          <p>
            Already Registered? <Link to={"/login"}>Login Now</Link>
          </p>
          <button className="submit-btn" type="submit">
            Register
          </button>
        </form>
      </section>
    </article>
  );
};

export default Register;
