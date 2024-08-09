import React from "react";
import "./InfoModal.scss";
import { infoModalContent } from "../../../../data/presets";

const InfoModal = () => {
    return <div className="info-modal">
        {infoModalContent.map((section, sectionIndex) => (
            <div key={sectionIndex}>
                <h4 className="info-modal-header">{section.header}</h4>
                <div className="info-modal-divider"></div>
                <ul>
                    {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                    ))}
                </ul>
            </div>
        ))}
    </div>;
};

export default InfoModal;
