import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ErrorBoundary from "./ErrorBoundary.js";
import ShareablePreview from "./components/Mobile/ShareablePreview.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Router>
        <Routes>
          <Route exact path="/" element={<App/>} />
          <Route path="/preview" element={<ShareablePreview />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
