import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/home.css";

const HomePage = () => {
  const navigate = useNavigate();
  const boards = useSelector((state) => state.board);

  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  return (
    <div className="main home">
      <Sidebar />
      <div className="content">
        <h1 className="home-head">All Boards</h1>
        <div className="boards-list">
          {boards.map((board) => (
            <div
              className="board-tile tile"
              key={board.id}
              onClick={() => handleBoardClick(board.id)}
            >
              <img
                alt="cover"
                src="https://png.pngtree.com/thumb_back/fw800/background/20230411/pngtree-forest-landscape-moon-nature-landscape-cartoon-background-decoration-illustration-game-background-image_2183530.jpg"
              ></img>
              <span className="board-title">{board.title}</span>
            </div>
          ))}
        </div>
        <h1 className="home-head">Your Boards</h1>
        <div className="boards-list">
          {boards.map((board) => (
            <div
              className="board-tile tile"
              key={board.id}
              onClick={() => handleBoardClick(board.id)}
            >
              <img
                alt="cover"
                // src="https://th.bing.com/th/id/R.c65ba403ed9c885568de22510fcc3b77?rik=TrhFTNlIZ8DfAg&riu=http%3a%2f%2fyesofcorsa.com%2fwp-content%2fuploads%2f2019%2f05%2f4K-Landscape-Scenery-Wallpaper-Full-HD.jpg&ehk=MDJLn%2bql5jTVqnH8yRuQ3iZpsbPkkrGNJLNnnlvQlHU%3d&risl=&pid=ImgRaw&r=0"
                src="https://wallpaperbat.com/img/90735-animated-landscape-2560x1440-wallpaper.png"
              ></img>
              <span className="board-title">{board.title}</span>
            </div>
          ))}
          <div className="board-tile create-board">
            <Link className="create-board-link" to="/new-board">
              Create new board
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
