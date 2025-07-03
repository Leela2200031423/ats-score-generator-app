import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

const EMAILJS_SERVICE_ID = "service_m5f1lvc";
const EMAILJS_TEMPLATE_ID = "template_6jwdjgl";
const EMAILJS_USER_ID = "IwwofwKwuaC3pAO-L";

const Contact = () => {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_USER_ID
      )
      .then(
        (result) => {
          setSent(true);
          setSending(false);
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          setSending(false);
        }
      );
  };

  return (
    <section className="contact-section">
      <h1 className="contact-title gradient-text">Get In Touch</h1>
      <p className="contact-subtitle">
        Have questions? We’re here to help you optimize your resume
      </p>
      <div className="contact-grid">
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input type="text" name="user_name" required placeholder="Enter your full name" />
          </label>
          <label>
            Email Address
            <input type="email" name="user_email" required placeholder="Enter your email address" />
          </label>
          <label>
            Message
            <textarea name="message" required placeholder="Tell us how we can help you..." rows={4} />
          </label>
          <button type="submit" className="contact-send-btn" disabled={sending}>
            {sending ? "Sending..." : sent ? "Sent!" : "Send Message"}
          </button>
        </form>
        <div className="contact-info">
          <div className="contact-card">
            <div className="contact-card-icon email">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="8" fill="#3cf2ff" />
                <path d="M6 8l6 5 6-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                <rect x="6" y="8" width="12" height="8" rx="2" stroke="#fff" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <div className="contact-card-title">Email Us</div>
              <a href="mailto:2200031423cseh@gmail.com" className="contact-card-link">
                2200031423cseh@gmail.com
              </a>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon time">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="8" fill="#7b61ff" />
                <circle cx="12" cy="12" r="6" stroke="#fff" strokeWidth="2" />
                <path d="M12 8v4l2 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="contact-card-title">Response Time</div>
              <div className="contact-card-desc">Within 24 hours</div>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-card-title">Follow Us</div>
            <div className="contact-social-row">
              {/* <a href="#" className="contact-social-icon" title="Twitter">
                <span role="img" aria-label="Twitter">🦩</span>
              </a> */}
              <a href="https://www.linkedin.com/in/nadiminti-leela-prasad-272418256" className="contact-social-icon" title="LinkedIn">
                <span role="img" aria-label="LinkedIn">💼</span>
              </a>
              <a href="2200031423cseh@gmail.com" className="contact-social-icon" title="Website">
                <span role="img" aria-label="Website">✉️</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;