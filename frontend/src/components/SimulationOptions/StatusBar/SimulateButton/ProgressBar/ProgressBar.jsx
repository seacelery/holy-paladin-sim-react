import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ simulationProgress, showSuccessAnimation, showCancelledAnimation }) => {
    return (
        <div className="simulation-progress-bar-container">
            <div className="simulation-progress-bar" style={{ width: `${simulationProgress}%`, background: showCancelledAnimation ? "var(--red-font-cancelled)" : "linear-gradient(to bottom, #16a137 0%,#15b12c 50%,#12aa2b 51%,#17c52e 100%)" }}>
                <span className="simulation-progress-bar-text">{(showSuccessAnimation || showCancelledAnimation) ? "" : `${simulationProgress}%`}</span>

                <div className="simulation-progress-bar-check-container"> 
                    <svg 
                        className={`simulation-progress-bar-checkmark ${showSuccessAnimation ? 'animate-checkmark' : ''}`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 52 52"
                    > 
                        <circle 
                            className={`simulation-progress-bar-checkmark-circle ${showSuccessAnimation ? 'animate-circle' : ''}`} 
                            cx="26" 
                            cy="26" 
                            r="25" 
                            fill="none"
                        /> 
                        <path 
                            className={`simulation-progress-bar-checkmark-check ${showSuccessAnimation ? 'animate-check' : ''}`} 
                            fill="none" 
                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />                    
                    </svg>

                    <svg 
                        className="simulation-progress-bar-cancel" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 52 52"
                    > 
                        <circle 
                            className={`simulation-progress-bar-cancel-circle ${showCancelledAnimation ? 'animate-circle' : ''}`} 
                            cx="26" 
                            cy="26" 
                            r="25" 
                            fill="none"
                        /> 
                        <path 
                            className={`simulation-progress-bar-cancel-x ${showCancelledAnimation ? 'animate-x' : ''}`} 
                            fill="none" 
                            d="M16 16 L36 36 M36 16 L16 36"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;