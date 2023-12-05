// pages/HomePage.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBoard } from "../slices/boardSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleAddBoard = () => {
    if (newBoardTitle.trim() === "") {
      // Don't add a board with an empty title
      return;
    }

    dispatch(
      addBoard({
        newBoard: {
          id: Date.now(),
          title: newBoardTitle,
          lists: [],
        },
      })
    );

    // Clear input after adding a new board
    setNewBoardTitle("");
  };

  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Home Page!</h1>
      <div style={styles.addBoardContainer}>
        <input
          type="text"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          placeholder="Enter new board title"
          style={styles.input}
        />
        <button onClick={handleAddBoard} style={styles.addButton}>
          Add Board
        </button>
      </div>
      <div style={styles.boardButtonsContainer}>
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
};

export default HomePage;
