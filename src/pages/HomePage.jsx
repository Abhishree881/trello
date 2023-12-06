import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const boards = useSelector((state) => state.board);

  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Home Page!</h1>
      <div style={styles.addBoardContainer}>
        <Link to="/new-board" style={styles.link}>
          Create a New Board
        </Link>
      </div>
      <div style={styles.boardButtonsContainer}>
        {console.log(boards)}
        {boards.map((board) => (
          <button
            key={board.id}
            onClick={() => handleBoardClick(board.id)}
            style={styles.boardButton}
          >
            {board.title}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  addBoardContainer: {
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    marginRight: "8px",
  },
  addButton: {
    padding: "8px",
    cursor: "pointer",
  },
  boardButtonsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  boardButton: {
    padding: "10px",
    margin: "8px",
    cursor: "pointer",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  link: {
    padding: "10px",
    margin: "8px",
    cursor: "pointer",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
  },
};

export default HomePage;
