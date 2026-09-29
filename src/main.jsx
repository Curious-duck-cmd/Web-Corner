import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./landing.css";
import BootLoader from "./components/BootLoader";

const LazyApp = React.lazy(() => import("./App.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback={<BootLoader />}>
      <LazyApp />
    </React.Suspense>
  </React.StrictMode>,
);
