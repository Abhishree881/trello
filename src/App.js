import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewBoardPage from "./pages/NewBoardPage";
import BoardPage from "./pages/BoardPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "./slices/boardSlice";
import sampleData from "./data";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board);
  const [user, setUser] = React.useState(null);

  // Initialize with sample data
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    if (boards.length === 0) {
      sampleData.forEach((board) => {
        const newBoard = { id: Date.now(), ...board };
        dispatch(addBoard({ newBoard }));
      });
    }

    return () => unsubscribe();
  }, [boards, dispatch]);

  if (!user) {
    // User not signed in, show SignUpPage
    return (
      <Router>
        <Routes>
          <Route path="*" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    );
  }

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
