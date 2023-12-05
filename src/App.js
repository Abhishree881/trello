// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import { addBoard } from "./slices/boardSlice";
import sampleData from "./data";

const App = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board);

  useEffect(() => {
    // Check if the Redux state is empty
    if (boards.length === 0) {
      // Dispatch initial data to Redux state
      sampleData.forEach((board) => {
        // Add an 'id' property to each board
        const newBoard = { id: Date.now(), ...board };
        dispatch(addBoard({ newBoard }));
      });
    }
  }, [boards, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board/:boardId" element={<BoardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
