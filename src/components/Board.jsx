// components/Board.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import List from "./List";
import { addList, addCard } from "../slices/boardSlice";

const Board = ({ board }) => {
  const dispatch = useDispatch();
  const [newListTitle, setNewListTitle] = useState("");
  const [isAddingList, setIsAddingList] = useState(false);

  const handleAddList = () => {
    if (newListTitle.trim() !== "") {
      const newList = { id: Date.now(), title: newListTitle, cards: [] };
      dispatch(addList({ boardId: board.id, newList }));
      setNewListTitle("");
      setIsAddingList(false);
    }
  };

  const handleAddCard = (listId, newCardTitle) => {
    dispatch(
      addCard({ listId, newCard: { id: Date.now(), title: newCardTitle } })
    );
  };

  return (
    <div className="board">
      <h2>{board.title}</h2>
      <div className="lists">
        {board.lists.map((list) => (
          <List
            key={list.id}
            list={list}
            onAddCard={(cardTitle) => handleAddCard(list.id, cardTitle)}
          />
        ))}
        {isAddingList ? (
          <div className="add-list">
            <input
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Enter list title"
            />
            <button onClick={handleAddList}>Add List</button>
          </div>
        ) : (
          <div
            className="add-list-button"
            onClick={() => setIsAddingList(true)}
          >
            + Add a list
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
