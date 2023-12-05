// pages/HomePage.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBoard } from "../slices/boardSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board);

  const handleAddBoard = () => {
    dispatch(
      addBoard({
        newBoard: {
          id: Date.now(),
          title: `New Board ${Date.now()}`,
          lists: [],
        },
      })
    );
  };

  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={handleAddBoard}>Add Board</button>
      <div>
        {boards.map((board) => (
          <button key={board.id} onClick={() => handleBoardClick(board.id)}>
            {board.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
