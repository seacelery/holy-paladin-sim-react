import React from "react";
import "./Loader.css";

const Loader = ({ loading, size = "small" }) => {
    return (
        <>
            {loading && (
                <div className={`loader-container ${size === "large" ? "loader-large" : ""}`}>
                    <div className="loader"></div>
                </div>
            )}
        </>
    );
};

export default Loader;
