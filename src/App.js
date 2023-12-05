// App.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Board from "./components/Board";
import { addBoard, addList, addCard } from "./slices/boardSlice";
import sampleData from "./data";

const App = () => {
  const boards = useSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the Redux state is empty
    if (boards.length === 0) {
      // Dispatch initial data to Redux state
      sampleData.forEach((board) => {
        // Add an 'id' property to each board
        const newBoard = { id: Date.now(), ...board };
        dispatch(addBoard({ newBoard })); // Dispatch addBoard action here
      });
    }
  }, [boards, dispatch]);

  const handleAddList = (boardId, newListTitle) => {
    dispatch(
      addList({
        boardId,
        newList: { id: Date.now(), title: newListTitle, cards: [] },
      })
    );
  };

  const handleAddCard = (listId, newCardTitle) => {
    dispatch(
      addCard({ listId, newCard: { id: Date.now(), title: newCardTitle } })
    );
  };

  return (
    <div className="app">
      {boards.map((board) => (
        <Board
          key={board.id}
          board={board}
          onAddList={(newListTitle) => handleAddList(board.id, newListTitle)}
          onAddCard={(listId, newCardTitle) =>
            handleAddCard(listId, newCardTitle)
          }
        />
      ))}
    </div>
  );
};

export default App;
