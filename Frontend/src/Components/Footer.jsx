import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-logo">Devmate</div>
          <p>
            © {new Date().getFullYear()} Devmate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
