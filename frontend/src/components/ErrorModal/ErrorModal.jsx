import React, { useEffect, useRef } from "react";
import "./ErrorModal.scss";

const ErrorModal = ({
    errorMessage,
    width,
    height,
    modalPosition = {},
    arrowPosition = {},
    onClose,
}) => {
    const { positionX, positionY } = modalPosition;
    const { beforeBottom, beforeLeft } = arrowPosition;

    const modalRef = useRef(null);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        };
    };

    useEffect(() => {
        if (onClose) {
            document.addEventListener("mousedown", handleClickOutside);
        };

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const styles = {
        width: width,
        height: height,
        left: positionX,
        top: positionY,
        "--before-bottom": beforeBottom,
        "--before-left": beforeLeft,
    };

    return (
        <div className="error-modal" style={styles} ref={modalRef}>
            {errorMessage}
        </div>
    );
};

export default ErrorModal;
