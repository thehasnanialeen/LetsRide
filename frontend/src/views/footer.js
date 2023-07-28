import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faGithub,
    faFacebook,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import '../css/footer.css';
import Photo from '../images/Logo.png';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="company-info">
            <img src={Photo} alt="Company Logo" className="footlogo" />
            {/* <h3 className="company-name">FastForward</h3> */}
          </div>
          <div className="item2">
            <span className="copyright">
              <span className="text">©</span>{" "}
              {new Date().getFullYear()} Let's Ride All Rights Reserved.
            </span>
          </div>
          <div className="social-icons">
            <a
              href="https://github.com/noahstaz/AgTech2023.git"
              target="_blank"
              className="icon-link"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="http://fb.com"
              target="_blank"
              className="icon-link"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="icon-link"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              className="icon-link"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;