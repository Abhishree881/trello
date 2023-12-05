import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "./Card";
import { addCard } from "../slices/boardSlice";

const List = ({ list }) => {
  const dispatch = useDispatch();
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCard = () => {
    if (newCardTitle.trim() !== "") {
      dispatch(
        addCard({
          listId: list.id,
          newCard: { id: Date.now(), title: newCardTitle },
        })
      );
      setNewCardTitle("");
      setIsAddingCard(false);
    }
  };

  return (
    <div className="list">
      <h3>{list.title}</h3>
      <ul>
        {list.cards.map((card) => (
          <Card key={card.id} cardTitle={card.title} />
        ))}
      </ul>
      {isAddingCard ? (
        <div className="add-card">
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
