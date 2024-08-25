import React, { useState, useRef, useContext, useEffect } from "react";
import "./BuffIcons.scss";
import Tooltip from "../../../Tooltip/Tooltip";
import { CharacterDataContext } from "../../../../context/CharacterDataContext";
import { colourStatWords } from "../../../../data/breakdown-functions";

const BuffIcons = ({ rawIcons, label, dataType, showTooltip = false, exclusiveSelection = true, allowDeselection = true, defaultSelectedIcons = [], defaultExternalBuffTimers = {} }) => {
    const { setCharacterData } = useContext(CharacterDataContext);
    const buffType = label.toLowerCase().replaceAll(" ", "_");

    const icons = Object.keys(rawIcons).map(key => ({
        name: key,
        effect: rawIcons[key].effect,
        image: rawIcons[key].image
    }));

    const [selectedIcons, setSelectedIcons] = useState([]); 

    useEffect(() => {
        const defaultSelectedIndices = icons.map((icon, index) =>
            defaultSelectedIcons.includes(icon.name) ? index : null
        );
        setSelectedIcons(defaultSelectedIndices);
    }, [defaultSelectedIcons]);

    const [externalBuffTimers, setExternalBuffTimers] = useState(defaultExternalBuffTimers);
    const externalBuffCooldowns = {
        "Power Infusion": 120,
        "Innervate": 180
    };

    const [hoverElement, setHoverElement] = useState(null);
    const [tooltipText, setTooltipText] = useState(null);
    const iconRefs = useRef([]);

    // useEffect(() => {
    //     const defaultSelectedIndices = icons.map((icon, index) => 
    //         defaultSelectedIcons.includes(icon.name) ? index : null
    //     );
    //     setSelectedIcons(defaultSelectedIndices);
    // }, [defaultSelectedIcons, icons]);

    const handleMouseEnter = (iconName, index) => {
        const effect = rawIcons[iconName].effect;
        const formattedEffect = colourStatWords(effect);

        setTooltipText(`${iconName}<br><br>${formattedEffect}`);
        setHoverElement(iconRefs.current[index]);
    };

    const handleMouseLeave = () => {
        setTooltipText(null);
        setHoverElement(null);
    };

    const handleClick = (index, iconName) => {
        setSelectedIcons(prevSelectedIcons => {
            if (prevSelectedIcons.includes(index) && allowDeselection) {
                return prevSelectedIcons.filter(iconIndex => iconIndex !== index);
            } else if (exclusiveSelection) {
                return [index];
            } else {
                return [...prevSelectedIcons, index];
            };
        });

        toggleBuff(iconName);
    };

    const toggleBuff = (buffName) => {
        if (buffType === "external_buffs") {
            if (buffName === "Source of Magic") {
                setCharacterData(prev => {
                    const newCharacterData = { ...prev };
                    let buffsData = newCharacterData.consumables[buffType];
                    
                    if (!buffsData["Source of Magic"]) {
                        buffsData["Source of Magic"] = ["0"];
                    } else {
                        delete buffsData["Source of Magic"];
                    };
            
                    return newCharacterData;
                });
            } else {
                setCharacterData(prevCharacterData => {
                    const newCharacterData = { ...prevCharacterData };
                    let buffsData = newCharacterData.consumables[buffType];

                    if (Object.keys(buffsData).includes(buffName)) {
                        delete buffsData[buffName];
                    } else {
                        buffsData[buffName] = ["0"];
                        setExternalBuffTimers(prevExternalBuffTimers => {
                            const newExternalBuffTimers = { ...prevExternalBuffTimers };
                            newExternalBuffTimers[buffName] = buffsData[buffName];
                            return newExternalBuffTimers;
                        })
                    };

                    return newCharacterData;
                });
            };
        } else {
            setCharacterData(prev => {
                const newCharacterData = { ...prev };
                let buffsData = newCharacterData.consumables[buffType];
    
                if (exclusiveSelection) {
                    if (!buffsData.includes(buffName)) {
                        buffsData = [buffName];
                    } else {
                        buffsData = [];
                    };
                } else {
                    if (!buffsData.includes(buffName)) {
                        buffsData.push(buffName);
                    } else {
                        const indexToRemove = buffsData.indexOf(buffName);
                        if (indexToRemove > -1) {
                            buffsData.splice(indexToRemove, 1);
                        };
                    };
                };
    
                newCharacterData.consumables[buffType] = buffsData;
                return newCharacterData;
            });
        };
    };

    const addExternalBuffTimer = (buffName, cooldown) => {
        setExternalBuffTimers(prev => {
            const currentTimers = prev[buffName] || [];
            const lastTimer = currentTimers.length > 0 ? parseInt(currentTimers[currentTimers.length - 1], 10) : 0;
            const newTimer = (lastTimer + cooldown).toString();
            
            return {
                ...prev,
                [buffName]: [...currentTimers, newTimer]
            };
        });
    };

    const removeExternalBuffTimer = (buffName) => {
        setExternalBuffTimers(prev => {
            const currentTimers = prev[buffName] || [];
            if (currentTimers.length > 1) {
                return {
                    ...prev,
                    [buffName]: currentTimers.slice(0, -1)
                };
            };
            return prev;
        });
    };

    const handleTimerChange = (buffName, index, value) => {
        setExternalBuffTimers(prev => {
            const newTimers = { ...prev };
            newTimers[buffName][index] = value;
            return newTimers;
        });
    };

    useEffect(() => {
        setCharacterData(prev => {
            const newCharacterData = { ...prev };
            if (newCharacterData.consumables["external_buffs"]) {
                newCharacterData.consumables["external_buffs"] = externalBuffTimers;
            };

            return newCharacterData;
        });
    }, [externalBuffTimers])

    return (
        <>
            <div className="buff-icons-label">{label}:</div>
            <div className="buff-icons-container">
                {icons.map((icon, index) => {
                    const isExternalBuff = buffType === "external_buffs";
                    const isSourceOfMagic = icon.name === "Source of Magic";
                    const showTimers = isExternalBuff && !isSourceOfMagic && Object.keys(externalBuffTimers).includes(icon.name);

                    return <div key={icon.name} style={{ height: "5.1rem" }}>
                        <img
                            className={`buff-image ${selectedIcons.includes(index) ? "buff-image-selected" : "buff-image-unselected"}`}
                            src={icon.image}
                            alt={`${icon.name} icon`}
                            draggable="false"
                            {...{ [`data-${dataType}`]: icon.name }}
                            ref={element => iconRefs.current[index] = element}
                            onMouseEnter={() => handleMouseEnter(icon.name, index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(index, icon.name)}
                        />
                        {showTimers && (
                            <>
                                <div className="external-buff-buttons">
                                    <div 
                                        className="external-buff-add-button" 
                                        onClick={() => addExternalBuffTimer(icon.name, externalBuffCooldowns[icon.name])}
                                    >
                                        +
                                    </div>
                                    <div 
                                        className="external-buff-remove-button" 
                                        onClick={() => removeExternalBuffTimer(icon.name, externalBuffCooldowns[icon.name])}
                                    >
                                        -
                                    </div>
                                </div>                        
                                {externalBuffTimers[icon.name].map((timer, timerIndex) => {                             
                                    return <input 
                                        key={timerIndex} 
                                        className="external-buff-timer"
                                        value={timer}
                                        onChange={(e) => handleTimerChange(icon.name, timerIndex, e.target.value)}
                                    />
                                })}
                            </>
                        )}
                    </div>
                })}

                {hoverElement && showTooltip && (
                    <Tooltip
                        type="option"
                        hoverElement={hoverElement}
                    >
                        <div dangerouslySetInnerHTML={{ __html: tooltipText }} />
                    </Tooltip>
                )}
            </div>
        </>
    );
};

export default BuffIcons;