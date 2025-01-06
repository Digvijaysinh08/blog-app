import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../index";
import { BsInstagram, BsGithub, BsLinkedin, BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  const isDashboard = useLocation().pathname === "/dashboard";
  const { mode } = useContext(Context);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={
        isDashboard
          ? "hideFooter"
          : mode === "light"
          ? "light-footer"
          : "dark-footer"
      }
    >
      <div className="container">
        <div className="btn">
          <button>Vaghela</button>
        </div>

        <div className="footer_links">
          <h3>About</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer_links">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a
                href="https://github.com/Digvijaysinh08"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/vaghela-digvijaysinh/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="footer_links">
          <h3>Legal</h3>
          <ul>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="logo">© {currentYear} Vaghela's Blog</div>
        <div className="links">
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            <BsWhatsapp />
          </a>
          <a
            href="https://www.instagram.com/vaghela_digvijaysinh_08"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram />
          </a>
          <a
            href="https://github.com/Digvijaysinh08"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/vaghela-digvijaysinh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
