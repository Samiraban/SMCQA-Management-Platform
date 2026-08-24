import { Link } from "react-router-dom";
import "../styles/pages.css";

function NotFound() {
  return (
    <div className="page-notfound">
      <h1>404</h1>
      <p>This page doesn't exist. Let's get you back on track.</p>
      <Link to="/" className="btn btn-dark">
        Back to home
      </Link>
    </div>
  );
}

export default NotFound;
