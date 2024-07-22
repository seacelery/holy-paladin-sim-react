import React, { useState } from "react";

const Loader = () => {
    const [loading, setLoading] = useState(true);

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
