import React from "react";
import "./PriorityListButtons.scss";
import { FaPlus } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

const PriorityListButtons = ({ textParts, setTextParts, addItem, deleteItem }) => {
    const handleAndClick = () => {
        if (textParts.length >= 8) return;

        setTextParts((prevTextParts) => {
            const newTextParts = [...prevTextParts];
            console.log(newTextParts)
            if (!newTextParts[1]) {
                newTextParts.push("");
            };
            newTextParts.push("and");
            newTextParts.push("");
            return newTextParts;
        });
    };

    const handleOrClick = () => {
        if (textParts.length >= 8) return;

        setTextParts((prevTextParts) => {
            const newTextParts = [...prevTextParts];
            if (!newTextParts[1]) {
                newTextParts.push("");
            };
            newTextParts.push("or");
            newTextParts.push("");
            return newTextParts;
        });
    };

    const handleAddClick = () => {
        addItem();
    };

    const handleRemoveClick = () => {
        deleteItem();
    };

    return <div className="priority-list-buttons-container">
        <div className="priority-list-buttons">
            <div className="priority-list-buttons-button" style={{ color: "var(--paladin-font)" }} onClick={handleAndClick} >AND</div>
            <div className="priority-list-buttons-button" style={{ color: "var(--mana)"} } onClick={handleOrClick} >OR</div>
        </div>
        <div className="priority-list-buttons">
            <div className="priority-list-buttons-button" onClick={handleAddClick}>
                <FaPlus style={{ color: "var(--healing-font)", fontSize: "1.6rem" }} />
            </div>
            <div className="priority-list-buttons-button" onClick={handleRemoveClick}>
                <FaXmark style={{ color: "var(--red-font)", fontSize: "1.6rem" }} />
            </div>
        </div>
    </div>;
};

export default PriorityListButtons;
