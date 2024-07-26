import React from "react";
import "./Loader.css";

const Loader = ({ loading }) => {
    return (
        <>
            {loading && (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}
        </>
    );
};

export default Loader;
