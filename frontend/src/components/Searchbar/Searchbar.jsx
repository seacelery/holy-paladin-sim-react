import React, { useState, useEffect, useContext } from "react";
import "./Searchbar.scss";

const Searchbar = ({ data, width, fontSize, suggestionHeight = "2.9rem", maxDisplayedSuggestions = 5, newItem, setNewItem }) => {
    const inputStyles = {
        width: width,
        fontSize: fontSize,
        color: `${newItem ? `var(--rarity-${newItem?.quality.toLowerCase()}` : "var(--light-font-colour)"}`,
    };

    const suggestionsStyles = {
        maxHeight: `calc(${suggestionHeight} * ${maxDisplayedSuggestions})`,
    };

    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setSearchText(newItem ? newItem.name : "");
    }, [newItem]);

    const handleSearchbarValueChange = (e) => {
        setSearchText(e.target.value);

        if (e.target.value.length > 0) {
            setSuggestionsOpen(true);
        } else {
            setSuggestionsOpen(false);
        };
    };

    const handleSuggestionClick = (item) => {
        const newStats = {};
        for (const stat in item.stats) {
            if (stat === "Critical Strike") {
                newStats["crit"] = item.stats[stat];
            } else {
                newStats[stat.toLowerCase()] = item.stats[stat];
            };
        };

        const formattedItem = {
            ...item,
            item_icon: item.icon,
            item_level: item.base_item_level,
            stats: newStats,
        };

        setNewItem(formattedItem);
        setSearchText(item.name);
        setSuggestionsOpen(false);
    };

    return (
        <div className="searchbar" style={{ borderRight: `${newItem}` ? `0.1rem solid var(--rarity-${newItem?.quality.toLowerCase()})` : "var(--border-colour-3)"}}>
            <input
                className="searchbar-input"
                type="text"
                placeholder="Choose a new item"
                value={searchText}
                onChange={(e) => handleSearchbarValueChange(e)}
                style={inputStyles}
            />

            {suggestionsOpen && (
                <div className="searchbar-suggestions" style={suggestionsStyles}>
                    {data
                        .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
                        .map((item) => (
                            <div className="searchbar-suggestion" key={item.id} onClick={() => handleSuggestionClick(item)}>
                                <img className="searchbar-suggestion-icon" src={item.icon} alt={item.name} style={{ border: `0.1rem solid var(--rarity-${item.quality.toLowerCase()})` }} />
                                <span className="searchbar-suggestion-text" style={{ color: `var(--rarity-${item.quality.toLowerCase()})` }}>{item.name}</span>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
};

export default Searchbar;
