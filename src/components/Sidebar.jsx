import React from "react";
import { Link } from "react-router-dom";
import { BiStats } from "react-icons/bi";
import { FaTrello } from "react-icons/fa";
import UserProfile from "../components/UserProfile";
import "../styles/home.css";

const Sidebar = ({ setMain }) => {
  return (
    <div className="sidebar">
      <Link className="sidebar-items" to="/">
        <FaTrello />
        Boards
      </Link>
      <Link className="sidebar-items" to="/new-board">
        <BiStats />
        Home
      </Link>
      <hr />
      <UserProfile />
    </div>
  );
};

export default Sidebar;
