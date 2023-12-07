import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "./Card";
import { addCard } from "../slices/boardSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

const List = ({ list }) => {
  const dispatch = useDispatch();
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);

  const updateBoardInFirestore = async (listId, newCard) => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const updatedBoards = userDocSnapshot.data().boards.map((board) => {
          const updatedLists = board.lists.map((list) => {
            if (list.id === listId) {
              return { ...list, cards: [...list.cards, newCard] };
            }
            return list;
          });

          if (board.lists.some((list) => list.id === listId)) {
            return { ...board, lists: updatedLists };
          }
          return board;
        });

        updateDoc(userDocRef, { boards: updatedBoards });
      }
    }
  };

  const handleAddCard = () => {
    if (newCardTitle.trim() !== "") {
      dispatch(
        addCard({
          listId: list.id,
          newCard: { id: Date.now(), title: newCardTitle },
        })
      );
      const newCard = { id: Date.now(), title: newCardTitle };
      updateBoardInFirestore(list.id, newCard);
      setNewCardTitle("");
      setIsAddingCard(false);
    }
  };

  const cardRef = useRef(null);

  const closeCard = () => {
    setIsAddingCard(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        closeCard();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="list">
      <h3>{list.title}</h3>
      <ul>
        {list.cards.map((card) => (
          <Card key={card.id} cardTitle={card.title} />
        ))}
      </ul>
      {isAddingCard ? (
        <div className="add-card" ref={cardRef}>
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="Enter card title"
          />
          <button onClick={handleAddCard}>Add Card</button>
        </div>
      ) : (
        <button onClick={() => setIsAddingCard(true)}>+ Add a card</button>
      )}
    </div>
  );
};

export default List;
