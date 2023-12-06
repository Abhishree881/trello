import React, { useState } from "react";
import { useDispatch } from "react-redux";
import List from "./List";
import { addList } from "../slices/boardSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import "../styles/board.css";

const Board = ({ board }) => {
  const dispatch = useDispatch();
  const [newListTitle, setNewListTitle] = useState("");
  const [isAddingList, setIsAddingList] = useState(false);

  const updateBoardInFirestore = async (currBoard) => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const updatedBoards = userDocSnapshot
          .data()
          .boards.map((b) => (b.id === board.id ? currBoard : b));
        updateDoc(userDocRef, { boards: updatedBoards });
      }
    }
  };

  const handleAddList = () => {
    if (newListTitle.trim() !== "") {
      const newList = { id: Date.now(), title: newListTitle, cards: [] };
      dispatch(addList({ boardId: board.id, newList }));
      const updatedLists = [...board.lists, newList];
      const currBoard = {
        id: board.id,
        lists: updatedLists,
        title: board.title,
      };
      updateBoardInFirestore(currBoard);
      setNewListTitle("");
      setIsAddingList(false);
    }
  };

  return (
    <div className="board">
      <div className="board-parent">
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
    </div>
  );
};

export default Board;
