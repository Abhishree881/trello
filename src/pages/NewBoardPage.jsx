import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBoard } from "../slices/boardSlice";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

const NewBoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleAddBoard = async () => {
    if (newBoardTitle.trim() === "") {
      // Don't add a board with an empty title
      return;
    }

    const newBoard = {
      id: Date.now(),
      title: newBoardTitle,
      lists: [],
    };

    dispatch(addBoard({ newBoard }));
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const updatedBoards = [...userDocSnapshot.data().boards, newBoard];
        updateDoc(userDocRef, { boards: updatedBoards });
      } else {
        const newUserDocRef = doc(db, "users", user.uid);
        await setDoc(newUserDocRef, { boards: [newBoard] });
      }
    }

    // Clear input after adding a new board
    setNewBoardTitle("");

    // Redirect to the new board
    navigate(`/board/${newBoard.id}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Create a New Board</h1>
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
};

export default NewBoardPage;
