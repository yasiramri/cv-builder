import React from 'react';
import { FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-5 pb-3 mt-5 border-top">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4 text-center text-md-start">
          {/* Brand */}
          <div>
            <h6 className="fw-bold">CV Builder Pro</h6>
            <p className="text-muted">Create professional CVs with ease</p>
          </div>

          {/* Features */}
          <div>
            <h6 className="fw-bold">Features</h6>
            <ul className="list-unstyled text-muted">
              <li>
                <a href="/create" className="text-decoration-none text-muted">
                  CV Builder
                </a>
              </li>
              <li>
                <a href="/check" className="text-decoration-none text-muted">
                  CV Checker
                </a>
              </li>
              <li>
                <a
                  href="/templates"
                  className="text-decoration-none text-muted"
                >
                  Templates
                </a>
              </li>
              <li>
                <a href="/ai" className="text-decoration-none text-muted">
                  AI Analysis
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className="fw-bold">Company</h6>
            <ul className="list-unstyled text-muted">
              <li>
                <a href="/about" className="text-decoration-none text-muted">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-decoration-none text-muted">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-decoration-none text-muted">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-decoration-none text-muted">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h6 className="fw-bold">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-dark">
                <FaTwitter />
              </a>
              <a href="#" className="text-dark">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-dark">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <hr className="my-4" />
        <p className="text-center text-muted mb-0">
          © 2025 Nalar Project. All rights reserved. Created by yasiramrr
        </p>
      </div>
    </footer>
  );
};

export default Footer;
