import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiStats } from "react-icons/bi";
import { FaTrello } from "react-icons/fa";
import UserProfile from "../components/UserProfile";
import "../styles/home.css";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <Link
        className={
          location.pathname === "/new-board"
            ? "sidebar-items"
            : "sidebar-items active"
        }
        to="/"
      >
        <FaTrello />
        Boards
      </Link>
      <Link
        className={
          location.pathname === "/" ? "sidebar-items" : "sidebar-items active"
        }
        to="/new-board"
      >
        <BiStats />
        Home
      </Link>
      <hr />
      <UserProfile />
    </div>
  );
};

export default Sidebar;
