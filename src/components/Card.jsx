import React, { useState } from "react";

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
  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
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
