import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { FaTrello } from "react-icons/fa";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const NavBar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  var avatarInitial;
  var displayName;
  if (userEmail) {
    displayName = userEmail.split("@")[0];
    avatarInitial = userEmail.charAt(0).toUpperCase();
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signup");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSwitch = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const submenuRef = useRef(null);

  const closeSubMenu = () => {
    setIsSubMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        closeSubMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="nav">
      <div className="nav-items">
        <Link to="/" className="nav-links home-link">
          <FaTrello /> Trello
        </Link>
        <Link to="/new-board" className="nav-links">
          New Board
        </Link>
      </div>
      <div
        className="avatar first"
        onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
      >
        {avatarInitial}
      </div>
      {isSubMenuOpen && (
        <div className="submenu" ref={submenuRef}>
          <h3>ACCOUNT</h3>
          <div className="profile">
            <div className="avatar alt">{avatarInitial}</div>
            <div className="user-info">
              <span>{displayName}</span>
              <span>{userEmail}</span>
            </div>
          </div>
          <div className="submenu-item" onClick={handleSwitch}>
            Switch Account
          </div>
          <div className="submenu-item" onClick={handleSignOut}>
            Sign Out
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
