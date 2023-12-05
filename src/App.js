// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewBoardPage from "./pages/NewBoardPage";
import BoardPage from "./pages/BoardPage";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "./slices/boardSlice";
import sampleData from "./data";

const App = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board);

  // Initialize with sample data
  React.useEffect(() => {
    if (boards.length === 0) {
      sampleData.forEach((board) => {
        const newBoard = { id: Date.now(), ...board };
        dispatch(addBoard({ newBoard }));
      });
    }
  }, [boards, dispatch]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-board" element={<NewBoardPage />} />
        <Route path="/board/:boardId" element={<BoardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
