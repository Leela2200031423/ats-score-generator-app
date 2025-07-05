import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../context/AnalysisContext";
import "./Upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { setAnalysis, setResumeFile } = useAnalysis();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Enhanced file handler for Drive/Cloud/Blob support
  const handleFile = async (selectedFile) => {
    // If it's a real PDF file
    if (selectedFile && selectedFile.type === "application/pdf") {
      if (selectedFile.size === 0) {
        alert(
          "The selected file is empty. If you uploaded from Google Drive, please download the PDF to your device first, then upload from Files."
        );
        return;
      }
      setFile(selectedFile);
      setFileInfo({
        name: selectedFile.name,
        size: (selectedFile.size / 1024 / 1024).toFixed(2),
      });
      setUploadSuccess(false);
    } else if (
      selectedFile &&
      selectedFile.name &&
      selectedFile.name.endsWith(".pdf")
    ) {
      // Try to fetch the file if it's a blob or Drive link
      try {
        const response = await fetch(selectedFile);
        const blob = await response.blob();
        if (blob.type === "application/pdf" && blob.size > 0) {
          const fileFromBlob = new File([blob], selectedFile.name, {
            type: "application/pdf",
          });
          setFile(fileFromBlob);
          setFileInfo({
            name: fileFromBlob.name,
            size: (fileFromBlob.size / 1024 / 1024).toFixed(2),
          });
          setUploadSuccess(false);
        } else {
          alert(
            "The selected file is empty or not a valid PDF. If you uploaded from Google Drive, please download the PDF to your device first, then upload from Files."
          );
        }
      } catch (e) {
        alert(
          "Could not read file from Drive. Please download to device first, then upload from Files."
        );
      }
    } else {
      alert("Please select a PDF file.");
    }
  };

  const handleChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a resume file first.");
      return;
    }
    if (file.size === 0) {
      alert(
        "The selected file is empty. If you uploaded from Google Drive, please download the PDF to your device first, then upload from Files."
      );
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://ats-score-generator-app-uxkx.vercel.app/api/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setAnalysis(res.data.result);
      setResumeFile(file);
      localStorage.setItem("ats_analysis", res.data.result); // persist for reloads
      setUploadSuccess(true);
      navigate("/analysis");
    } catch (error) {
      alert("Upload failed. Check backend logs or file format.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setFileInfo(null);
    setUploadSuccess(false);
  };

  return (
    <div className="upload-page">
      <h1 className="upload-title gradient-text">Upload Your Resume</h1>
      <p className="upload-subtitle">
        Drop your PDF resume below and get instant ATS analysis
      </p>
      <div
        className={`upload-dropzone ${dragActive ? "active" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {!file && (
          <div className="upload-drop-content">
            <div className="upload-icon">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 16V4M12 4l-4 4M12 4l4 4"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="4"
                  y="16"
                  width="16"
                  height="4"
                  rx="2"
                  fill="#fff"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
            <div className="upload-drop-text">
              <span className="upload-drop-title">
                Drag &amp; Drop Your Resume
              </span>
              <span className="upload-drop-desc">
                or click to browse files (PDF only)
              </span>
            </div>
            <button
              type="button"
              className="upload-choose-btn"
              onClick={handleButtonClick}
            >
              Choose File
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              capture
              className="hidden"
              onChange={handleChange}
            />
            <p className="upload-note" style={{ marginTop: 12, color: "#888", fontSize: 13 }}>
              <b>Note:</b> If uploading from Google Drive doesn't work, please download the PDF to your device first, then upload from Files. Google Drive uploads on mobile may not provide the actual file.
            </p>
          </div>
        )}

        {file && (
          <div className="upload-drop-content">
            <div className="upload-success-icon">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="12" fill="none" />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="upload-file-name">{file.name}</div>
            <div className="upload-file-info">
              File uploaded successfully • {fileInfo?.size} MB
            </div>
            <div className="upload-btn-row">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="upload-analyze-btn"
              >
                {loading ? "Analyzing..." : "Analyze Resume"}
              </button>
              <button onClick={handleReset} className="upload-reset-btn">
                Upload Different File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;