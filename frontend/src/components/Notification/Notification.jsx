import React from "react";
import "./Notification.scss";

const Notification = ({ notificationMessage, width, height, fontSize, notificationVisible }) => {
    const styles = {
        width: width,
        height: height,
        fontSize: fontSize,
    };

    return <div className={`notification ${notificationVisible ? "" : "notification-fade"}`} style={styles}>{notificationMessage}</div>;
};

export default Notification;
