import React from "react";
import "./PriorityList.scss";
import { FaListUl } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { FaPaste } from "react-icons/fa6";
import { FaCircleQuestion } from "react-icons/fa6";
import PriorityListItems from "./PriorityListItems/PriorityListItems";

const PriorityList = () => {
    return <div className="options-tab-content priority-list-content">
        <div className="priority-list-container">
            <div className="priority-list-headers">
                <div className="priority-list-header-ability">Ability</div>
                <div className="priority-list-header-conditions">Conditions</div>

                <div className="priority-list-info">
                    <div className="priority-list-info-icon">
                        <FaListUl />
                    </div>
                    
                    <div className="priority-list-info-icon">
                        <FaCopy className="priority-list-copy-icon" />
                    </div>
                    
                    <div className="priority-list-info-icon">
                        <FaPaste />
                    </div>
                    
                    <div className="priority-list-info-icon">
                        <FaCircleQuestion />
                    </div>
                </div>
            </div>

            <PriorityListItems />
        </div>
    </div>;
};

export default PriorityList;
