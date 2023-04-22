import React from "react";
import "./about.css";
import image from "../Home/assets/bg1.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function About(props) {
  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="content-section">
            <div className="title">
              <h1>About Us</h1>
            </div>
            <div className="content">
              <h4>
                {props.name ? `Welcome - ${props.name}` : "Welcome"} to our
                plant disease detection page!
              </h4>
              <h3>Out Mission</h3>
              <p>
                Our mission is to help farmers and gardeners detect and diagnose
                plant diseases early, so that they can take the necessary steps
                to prevent further spread and damage.
              </p>
              <h3>Who We Are?</h3>
              <p>
                Our team of experts includes botanists, plant pathologists, and
                computer scientists who are passionate about using technology to
                solve real-world problems. We are constantly refining our system
                and working to improve its accuracy and reliability.
              </p>
              <div class="button">
                <a href="/About">Read More</a>
              </div>
            </div>
            <div className="social">
              <a href="/About">
                <i>
                  <FaFacebook className="icon" />
                </i>
              </a>
              <a href="/About">
                <i>
                  <FaTwitter className="icon" />
                </i>
              </a>
              <a href="/About">
                <i>
                  <FaInstagram className="icon" />
                </i>
              </a>
            </div>
          </div>
          <div className="image-section">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
