import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import List from "./List";
import { addList, editList, deleteList } from "../slices/boardSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import "../styles/board.css";

const Board = ({ board }) => {
  const dispatch = useDispatch();
  const [newListTitle, setNewListTitle] = useState("");
  const [editedListTitle, setEditedListTitle] = useState("");
  const [isAddingList, setIsAddingList] = useState(false);
  // const [isEditingList, setIsEditingList] = useState(false);
  const [editingListId, setEditingListId] = useState(null);

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

  const handleEditList = () => {
    if (editedListTitle.trim() !== "") {
      const updatedLists = board.lists.map((list) =>
        list.id === editingListId ? { ...list, title: editedListTitle } : list
      );
      console.log(updatedLists);
      const currBoard = {
        id: board.id,
        lists: updatedLists,
        title: board.title,
      };
      const updatedList = board.lists.map((list) =>
        list.id === editingListId ? { ...list, title: editedListTitle } : ""
      );
      console.log(updatedList);
      dispatch(
        editList({
          boardId: board.id,
          listId: editingListId,
          editedList: {
            title: editedListTitle,
            cards: board.lists.find((list) => list.id === editingListId).cards,
          },
        })
      );
      updateBoardInFirestore(currBoard);
      setEditingListId(null);
      setEditedListTitle("");
      // setIsEditingList(false);
    }
  };

  const handleDeleteList = (listId) => {
    const updatedLists = board.lists.filter((list) => list.id !== listId);
    const currBoard = {
      id: board.id,
      lists: updatedLists,
      title: board.title,
    };
    dispatch(deleteList({ boardId: board.id, listId }));
    updateBoardInFirestore(currBoard);
  };

  const listRef = useRef(null);

  const closeInput = () => {
    setIsAddingList(false);
    // setIsEditingList(false);
    setEditingListId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        closeInput();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      isAddingList ? handleAddList() : handleEditList();
    }
  };

  return (
    <div className="board">
      <h2>{board.title}</h2>
      <div className="board-parent">
        <div className="lists">
          {board.lists.map((list) => (
            <List
              key={list.id}
              list={list}
              onEdit={() => {
                // setIsEditingList(true);
                // setEditedListTitle(editedTitle);
                setEditingListId(list.id);
              }}
              isEditing={editingListId === list.id}
              editedListTitle={editedListTitle}
              setEditedListTitle={setEditedListTitle}
              handleEditList={handleEditList}
              onDeleteList={() => handleDeleteList(list.id)}
            />
          ))}
          <div className="add-list-button-parent">
            {isAddingList ? (
              <div className="add-list" ref={listRef}>
                <input
                  type="text"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  placeholder="Enter list title"
                  onKeyDown={handleKeyDown}
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
    </div>
  );
};

export default Board;
