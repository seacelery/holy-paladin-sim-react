import { useContext, useState } from "react";
import { VersionContext } from "../../context/VersionContext";
import Button from "../Button/Button";
import "./Header.scss";
import { FaMoon } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

const Header = ({ theme, toggleTheme }) => {
    const { version, changeVersion } = useContext(VersionContext);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const versionOptions = [
        { id: "live", name: "Patch 11.0.0" },
        { id: "ptr", name: "The War Within" }
    ];

    const currentVersionName = versionOptions.find(option => option.id === version).name;

    return (
        <div className="header-container">
            <Button width="14rem" height="3.2rem" grow={false}>
                Import Template
            </Button>

            <div className="version-toggle-container" onClick={toggleDropdown}>
                <div className="version-input">
                    <div className="version-selected-version">{currentVersionName}</div>
                    <FaChevronDown className="fa-solid fa-chevron-down custom-version-select-arrow-down"></FaChevronDown>
                </div>
                {dropdownOpen && (
                    <div className="version-suggestions">
                        {versionOptions.map(option => (
                            <div key={option.id} className="version-option" onClick={() => changeVersion(option.id)}>
                                {option.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="theme-toggle-container">                   
                <div className="theme-toggle" onClick={toggleTheme}>
                    <div className={`theme-circle ${theme === "plain" ? "theme-checked" : ""}`}>
                        {theme === "paladin" 
                            ? <img className="theme-paladin-icon" src="src\assets\custom-icons\paladin-pink.png"/>
                            : <FaMoon className="theme-moon-icon"></FaMoon>
                        }
                    </div>                        
                </div>
            </div>
        </div> 
    );
};

export default Header;
