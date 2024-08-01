import React from "react";
import "./EditItemTrinkets.scss";

const EditItemTrinkets = ({ item }) => {
    const trinketEffect = item.effects[0];

    return <div className="edit-item-trinkets">
        {trinketEffect.description}
    </div>;
};

export default EditItemTrinkets;
