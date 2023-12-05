// pages/BoardPage.js
import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Board from "../components/Board";

const BoardPage = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const boards = useSelector((state) => state.board);
  const board = boards.find((board) => board.id === parseInt(boardId));

  if (!board) {
    // Redirect to the home page if the board is not found
    navigate("/");
    return null;
  }

  return (
    <div>
      <h1>{board.title}</h1>
      <Board board={board} />
    </div>
  );
};

export default BoardPage;
