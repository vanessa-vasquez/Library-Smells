import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Library from "./components/Library.js";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/avery"
        element={<Library name="Avery Architectural and Fine Arts Library" />}
      />
      <Route path="/law" element={<Library name="Law Library" />} />
      <Route
        path="/uris"
        element={<Library name="Business and Economics Library in Uris" />}
      />
      <Route path="/butler" element={<Library name="Butler Library" />} />
      <Route
        path="/noco"
        element={<Library name="Science and Engineering Library (NoCo)" />}
      />
      <Route path="/milstein" element={<Library name="Milstein Library" />} />
      <Route
        path="/east-asian"
        element={<Library name="East Asian Library" />}
      />
      <Route
        path="/lehman"
        element={<Library name="Lehman Social Sciences Library" />}
      />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
