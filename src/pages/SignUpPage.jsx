import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <form onSubmit={handleSignUp} style={styles.form}>
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
        <button style={styles.button} type="submit">
          Sign Up
        </button>
      </form>
      <p style={styles.link}>
        Already have an account? <Link to="/signin">Sign In</Link>
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

export default SignUpPage;
