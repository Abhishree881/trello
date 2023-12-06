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
                  src="https://th.bing.com/th/id/R.c65ba403ed9c885568de22510fcc3b77?rik=TrhFTNlIZ8DfAg&riu=http%3a%2f%2fyesofcorsa.com%2fwp-content%2fuploads%2f2019%2f05%2f4K-Landscape-Scenery-Wallpaper-Full-HD.jpg&ehk=MDJLn%2bql5jTVqnH8yRuQ3iZpsbPkkrGNJLNnnlvQlHU%3d&risl=&pid=ImgRaw&r=0"
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
