import React, { useEffect, useRef, useState } from "react";
import "../styles/card.css";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const Card = ({ card, onEditCard, onDelete, showCardRef }) => {
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
    <li className="card-display" ref={showCardRef}>
      {isEditing ? (
        <div ref={cardTitleRef}>
          <textarea
            value={editedTitle}
            onKeyDown={handleKeyDown}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <span>{card.title}</span>
          <div className="card-submenu">
            <button className="edit__delete" onClick={handleEdit}>
              <FiEdit style={{ fontSize: "12px" }} />
              Edit
            </button>
            <button className="edit__delete" onClick={onDelete}>
              <MdDeleteForever />
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default Card;
