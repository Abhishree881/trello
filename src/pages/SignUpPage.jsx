import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/signin.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home after successful sign-up
    } catch (error) {
      alert(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className="signin">
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <div class="screen__background">
              <span class="screen__background__shape screen__background__shape4"></span>
              <span class="screen__background__shape screen__background__shape3"></span>
              <span class="screen__background__shape screen__background__shape2"></span>
              <span class="screen__background__shape screen__background__shape1"></span>
            </div>
            <form onSubmit={handleSignUp} className="login">
              <div className="login__field">
                {/* <label style={styles.label}>Email:</label> */}
                <FaUser className="login__icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login__input"
                />
              </div>
              <div className="login__field">
                {/* <label style={styles.label}>Password:</label> */}
                <FaLock className="login__icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login__input"
                />
              </div>
              <button type="submit" className="button login__submit">
                <span className="button__text">Sign Up</span>
                <FaChevronRight className="button__icon" />
              </button>
            </form>

            <p className="change-link">
              Already have an account?{" "}
              <Link className="linkto" to="/signin">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
