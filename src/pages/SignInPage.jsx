// pages/SignInPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home after successful sign-in
    } catch (error) {
      alert(error.message);
      console.error(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign In</h2>
      <form onSubmit={handleSignIn} style={styles.form}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <br />
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <br />
        <button type="submit" style={styles.button}>
          Sign In
        </button>
      </form>
      <p style={styles.link}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "400px",
    margin: "auto",
    paddingTop: "50px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    marginBottom: "8px",
  },
  input: {
    padding: "8px",
    marginBottom: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  link: {
    marginTop: "20px",
    fontSize: "14px",
  },
};

export default SignInPage;
