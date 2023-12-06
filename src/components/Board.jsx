import React, { useState } from "react";
import { useDispatch } from "react-redux";
import List from "./List";
import { addList } from "../slices/boardSlice";

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

  return (
    <div className="board">
      <h2>{board.title}</h2>
      <div className="lists">
        {board.lists.map((list) => (
          <List key={list.id} list={list} />
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
