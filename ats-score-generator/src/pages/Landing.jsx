import React from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom"; // <-- import navigation

function LandingPage() {
  const navigate = useNavigate();

  const goToUpload = () => {
    navigate("/upload");
  };

  return (
    <section className="landing">
      <div className="landing-content">
        <h1 className="landing-title">
          <span className="gradient-text">Upload. Analyze. Improve.</span>
          <br />
          Get Hired.
        </h1>

        <p className="landing-subtitle">
          Advanced AI-powered ATS resume analysis that helps you<br />
          land interviews at top tech companies<br />
          if score is single digit then it out of 10(Ex:7/10) or 2 digits then it is out of 100(Ex:77/100)
        </p>

        <div className="landing-buttons">
          <button className="upload-btn" onClick={goToUpload}>
            Upload Resume <span>&rarr;</span>
          </button>
          <button className="how-btn">How It Works</button>
        </div>

        <div className="features-row">
          <div className="feature-card">
            <div className="feature-icon ai-icon">AI</div>
            <div className="feature-title">AI-Powered Analysis</div>
            <div className="feature-desc">
              Advanced algorithms analyze your resume like top ATS systems
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon instant-icon">&#9889;</div>
            <div className="feature-title">Instant Results</div>
            <div className="feature-desc">
              Get your ATS score and detailed feedback in seconds
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon target-icon">&#127919;</div>
            <div className="feature-title">Targeted Improvements</div>
            <div className="feature-desc">
              Actionable suggestions to optimize for your dream job
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
