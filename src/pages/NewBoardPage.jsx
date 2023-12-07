import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBoard } from "../slices/boardSlice";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import Sidebar from "../components/Sidebar";
import "../styles/home.css";

const NewBoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const boards = useSelector((state) => state.board);

  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

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
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddBoard(e);
    }
  };

  return (
    <div className="main">
      <Sidebar />
      <div className="content">
        <div className="create-page">
          <div className="create-card">
            <div className="card">
              <img
                alt="cover"
                src="https://trello.com/assets/e8544e0e1b2824e4ac46.svg"
              />
              <h4>Organize anything</h4>
              <p>
                Put everything in one place and start moving things forward with
                your first Trello board!
              </p>
              <div className="create-button">
                <input
                  type="text"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  placeholder="What are you working on?"
                  onKeyDown={handleKeyDown}
                />
                <button onClick={handleAddBoard}>Create your board</button>
              </div>
            </div>
          </div>
          <div className="recent-boards">
            <h3>Recent Boards</h3>
            {boards.map((board) => (
              <div
                className="recent-board-tile"
                key={board.id}
                onClick={() => handleBoardClick(board.id)}
              >
                <img
                  alt="cover"
                  src="https://png.pngtree.com/thumb_back/fw800/background/20230411/pngtree-forest-landscape-moon-nature-landscape-cartoon-background-decoration-illustration-game-background-image_2183530.jpg"
                ></img>
                <span className="">{board.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBoardPage;
