import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ErrorBoundary from "./ErrorBoundary.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Router>
        <Routes>
          <Route path="*" element={<App/>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
