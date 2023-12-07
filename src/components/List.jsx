import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "./Card";
import { addCard, editCard, deleteCard } from "../slices/boardSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

const List = ({
  list,
  onDeleteList,
  onEdit,
  isEditing,
  setEditedListTitle,
  handleEditList,
  editedListTitle,
  setEditingListId,
}) => {
  const dispatch = useDispatch();
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showCardId, setShowCardId] = useState();

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

  const editBoardInFirestore = async (listId, editedCard, cardId) => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const updatedBoards = userDocSnapshot.data().boards.map((board) => {
          const updatedLists = board.lists.map((list) => {
            if (list.id === listId) {
              if (editedCard) {
                // Update the card if it's an edit
                const updatedCards = list.cards.map((card) =>
                  card.id === cardId ? { ...card, ...editedCard } : card
                );
                return { ...list, cards: updatedCards };
              } else {
                // Remove the card if it's a deletion
                return {
                  ...list,
                  cards: list.cards.filter((card) => card.id !== cardId),
                };
              }
            }

            return list;
          });

          if (board.lists.some((list) => list.id === listId)) {
            return { ...board, lists: updatedLists };
          }
          return board;
        });

        await updateDoc(userDocRef, { boards: updatedBoards });
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

  const handleEditCard = (cardId, editedCard) => {
    dispatch(editCard({ listId: list.id, cardId, editedCard }));
    editBoardInFirestore(list.id, editedCard, cardId);
  };

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard({ listId: list.id, cardId }));
    editBoardInFirestore(list.id, null, cardId);
  };

  const cardRef = useRef(null);
  const listTitleRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        listTitleRef.current &&
        !listTitleRef.current.contains(event.target)
      ) {
        // closeInput();
        setEditingListId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isAddingCard) {
        handleAddCard(e);
      } else {
        handleEditList();
      }
    }
  };

  const handleCardClick = (cardId) => {
    setShowCard(true);
    setShowCardId(cardId);
  };

  const handleEditClick = () => {
    onEdit();
    setEditedListTitle(list.title);
  };

  return (
    <div className="list">
      {isEditing ? (
        <div ref={listTitleRef}>
          <input
            type="text"
            value={editedListTitle}
            onKeyDown={handleKeyDown}
            onChange={(e) => setEditedListTitle(e.target.value)}
          />
          <button onClick={handleEditList}>Save</button>
        </div>
      ) : (
        <h3>{list.title}</h3>
      )}
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={onDeleteList}>Delete</button>
      <ul>
        {list.cards.map((card) => (
          <>
            {showCard && card.id === showCardId ? (
              <Card
                key={card.id}
                card={card}
                onEditCard={handleEditCard}
                setShowCard={setShowCard}
                onDelete={() => handleDeleteCard(card.id)}
              />
            ) : (
              <li key={card.id} onClick={() => handleCardClick(card.id)}>
                {card.title}
              </li>
            )}
          </>
        ))}
      </ul>
      {isAddingCard ? (
        <div className="add-card" ref={cardRef}>
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="Enter card title"
            onKeyDown={handleKeyDown}
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
