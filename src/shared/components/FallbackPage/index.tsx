import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn’t exist.</p>
      <Link to="/">Go back Home</Link>
    </div>
  );
};

export default NotFound;
