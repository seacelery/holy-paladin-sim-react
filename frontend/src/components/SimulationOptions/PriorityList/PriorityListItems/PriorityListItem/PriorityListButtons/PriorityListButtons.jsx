import React from "react";
import "./PriorityListButtons.scss";
import { FaPlus } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

const PriorityListButtons = ({ textParts, setTextParts }) => {
    const handleAndClick = () => {
        if (textParts.length >= 8) return;

        setTextParts((prevTextParts) => {
            const newTextParts = [...prevTextParts];
            newTextParts.push("and");
            newTextParts.push("");
            return newTextParts;
        });
    };

    const handleOrClick = () => {
        if (textParts.length >= 8) return;

        setTextParts((prevTextParts) => {
            const newTextParts = [...prevTextParts];
            newTextParts.push("or");
            newTextParts.push("");
            return newTextParts;
        });
    };

    const handleAddClick = () => {};

    const handleRemoveClick = () => {
        setTextParts((prevTextParts) => {
            const newTextParts = [];
            return newTextParts
        });
    };

    return <div className="priority-list-buttons-container">
        <div className="priority-list-buttons">
            <div className="priority-list-buttons-button" style={{ color: "var(--paladin-font)" }} onClick={handleAndClick} >AND</div>
            <div className="priority-list-buttons-button" style={{ color: "var(--mana)"} } onClick={handleOrClick} >OR</div>
        </div>
        <div className="priority-list-buttons">
            <div className="priority-list-buttons-button">
                <FaPlus style={{ color: "var(--healing-font)", fontSize: "1.6rem" }}/>
            </div>
            <div className="priority-list-buttons-button">
                <FaXmark style={{ color: "var(--red-font)", fontSize: "1.6rem" }} onClick={handleRemoveClick} />
            </div>
        </div>
    </div>;
};

export default PriorityListButtons;
