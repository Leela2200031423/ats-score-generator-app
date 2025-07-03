import React, { createContext, useContext, useState } from "react";

const AnalysisContext = createContext();

export const useAnalysis = () => useContext(AnalysisContext);

export const AnalysisProvider = ({ children }) => {
  const [analysis, setAnalysis] = useState(() => localStorage.getItem("ats_analysis") || "");
  const [resumeFile, setResumeFile] = useState(null);

  // Persist analysis to localStorage
  const setAnalysisPersist = (value) => {
    setAnalysis(value);
    localStorage.setItem("ats_analysis", value);
  };

  return (
    <AnalysisContext.Provider value={{ analysis, setAnalysis: setAnalysisPersist, resumeFile, setResumeFile }}>
      {children}
    </AnalysisContext.Provider>
  );
};