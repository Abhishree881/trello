import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={styles.navBar}>
      <Link to="/" style={styles.navLink}>
        Home
      </Link>
      <Link to="/new-board" style={styles.navLink}>
        New Board
      </Link>
    </nav>
  );
};

const styles = {
  navBar: {
    backgroundColor: "#333",
    padding: "10px",
    marginBottom: "20px",
  },
  navLink: {
    color: "#fff",
    padding: "8px",
    margin: "0 10px",
    textDecoration: "none",
  },
};

export default NavBar;
