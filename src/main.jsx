import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Lazy load the main App
const LazyApp = lazy(() => import("./App.jsx"));

// A cleaner, more modern Loader Component
const PageLoader = () => (
  <div className="loader-container">
    <div className="loader-content">
      <div className="spinner"></div>
      <p>Initializing Experience...</p>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<PageLoader />}>
      <LazyApp />
    </Suspense>
  </React.StrictMode>,
);
