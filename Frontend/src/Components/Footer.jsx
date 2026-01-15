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

        <div className="footer-right">
          <a aria-label="Twitter">
            <svg viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775..." />
            </svg>
          </a>
          <a aria-label="YouTube">
            <svg viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246..." />
            </svg>
          </a>
          <a aria-label="Facebook">
            <svg viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5..." />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
