import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <h1 className="header-name">Cat Blog</h1>
      <nav className="nav-group">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/posts/new" className="nav-item">
          Add Post
        </Link>
      </nav>
    </div>
  );
}

export default Header;
