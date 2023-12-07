import React, { useEffect, useRef, useState } from "react";

const Card = ({ card, onEditCard, onDelete, setShowCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEditCard(card.id, { title: editedTitle });
    setIsEditing(false);
  };

  const cardTitleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardTitleRef.current &&
        !cardTitleRef.current.contains(event.target)
      ) {
        setIsEditing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
  };

  return (
    <li>
      {isEditing ? (
        <div ref={cardTitleRef}>
          <input
            type="text"
            value={editedTitle}
            onKeyDown={handleKeyDown}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <span>{card.title}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
          <button onClick={() => setShowCard(false)}>Close</button>
        </div>
      )}
    </li>
  );
};

export default Card;
