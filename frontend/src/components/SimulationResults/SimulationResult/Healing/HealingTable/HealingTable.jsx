import React from "react";
import "./HealingTable.scss";

const HealingTable = ({ simulationResult }) => {
    console.log(simulationResult)

    return <>
        <div className="table-wrapper">
            <table>
                <thead className="table-headers">
                    <tr>

                    </tr>
                </thead>

                <tbody className="table-body">

                </tbody>
            </table>
        </div>;
    </>
};

export default HealingTable;
