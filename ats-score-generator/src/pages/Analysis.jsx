import React, { useEffect, useState } from "react";
import { useAnalysis } from "../context/AnalysisContext";
import "./Analysis.css";

const icons = {
  score: "🏆",
  strengths: "💪",
  weaknesses: "⚠️",
  suggestions: "✨",
};

function parseAnalysis(analysis) {
  if (!analysis) return {};

  const scoreMatch = analysis.match(/\*?\*?Overall Score:\*?\*?\s*(\d+)/i);
  const strengthsMatch = analysis.match(/Strengths:\s*([\s\S]*?)(Weaknesses:|Suggestions:|$)/i);
  const weaknessesMatch = analysis.match(/Weaknesses:\s*([\s\S]*?)(Suggestions:|$)/i);
  const suggestionsMatch = analysis.match(/Suggestions(?: for Improvement)?:\s*([\s\S]*)/i);

  const splitLines = (str) =>
    str
      ? str
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line && !/^(\*\*|\*|\-\s*)?$/.test(line)) // removes empty, **, *, and "-" only lines
      : [];

  return {
    score: scoreMatch ? scoreMatch[1] : "--",
    strengths: splitLines(strengthsMatch?.[1]),
    weaknesses: splitLines(weaknessesMatch?.[1]),
    suggestions: splitLines(suggestionsMatch?.[1]),
  };
}

const Analysis = () => {
  const { analysis, resumeFile } = useAnalysis();
  const [parsed, setParsed] = useState(null);

  useEffect(() => {
    if (analysis) {
      const parsedData = parseAnalysis(analysis);
      setParsed(parsedData);
    }
  }, [analysis]);

  if (!analysis) {
    return (
      <div className="analysis-page">
        <div className="text-white text-xl p-10">⚠️ No analysis available. Please upload a resume.</div>
      </div>
    );
  }

  if (!parsed) {
    return (
      <div className="analysis-page">
        <div className="text-white text-xl p-10">⏳ Analyzing resume. Please wait...</div>
      </div>
    );
  }

  return (
    <div className="analysis-page">
      <div className="analysis-container">
        {/* Left: Resume Preview */}
        <div className="analysis-left">
          <div className="resume-card">
            <div className="resume-card-title">Your Resume</div>
            {resumeFile ? (
              <iframe
                src={URL.createObjectURL(resumeFile)}
                title="Resume Preview"
                className="resume-preview"
              />
            ) : (
              <div className="resume-placeholder">
                <span role="img" aria-label="Resume" style={{ fontSize: 48 }}>📄</span>
                <div>No resume file available.</div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Analysis Display */}
        <div className="analysis-right">
          <div className="score-card">
            <div className="score-icon">{icons.score}</div>
            <div>
              <div className="score-label">Overall Score</div>
              <div className="score-value">{parsed.score}</div>
            </div>
          </div>

          <div className="analysis-section-card strengths">
            <div className="section-title">{icons.strengths} Strengths</div>
            {parsed.strengths?.length > 0 ? (
              <ul>
                {parsed.strengths.map((s, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: s }} />
                ))}
              </ul>
            ) : (
              <div className="no-analysis">No strengths found.</div>
            )}
          </div>

          <div className="analysis-section-card weaknesses">
            <div className="section-title">{icons.weaknesses} Weaknesses</div>
            {parsed.weaknesses?.length > 0 ? (
              <ul>
                {parsed.weaknesses.map((w, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: w }} />
                ))}
              </ul>
            ) : (
              <div className="no-analysis">No weaknesses found.</div>
            )}
          </div>

          <div className="analysis-section-card suggestions">
            <div className="section-title">{icons.suggestions} Suggestions for Improvement</div>
            {parsed.suggestions?.length > 0 ? (
              <ul>
                {parsed.suggestions.map((s, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: s }} />
                ))}
              </ul>
            ) : (
              <div className="no-analysis">No suggestions found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
