import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./navbar.scss";

const Navbar = ({ handleSave, error, errorMessage }) => {

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleClick = () => {
        handleSave();
    }

    // useEffect to show the error message for 2 seconds 
    useEffect(() => {
        if (errorMessage) {
            setShowErrorMessage(true);
            // Set a timer to hide the error message after 2 seconds
            const timer = setTimeout(() => {
                setShowErrorMessage(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage, handleSave]);

    return (
        <div className="navbar">
            <div className="container">
                <div className="left" style={{justifyContent: !showErrorMessage ? "flex-start" : "center" }}>
                    {!showErrorMessage && (
                        <div className="title">
                            <span>Made by SunnyK9325</span>
                        </div>
                    )}
                    {showErrorMessage && (
                        <div className="status" style={{ backgroundColor: error ? "#FBCCCB" : "#C3FF93" }}>
                            <span>{errorMessage}</span>
                        </div>
                    )}
                </div>
                <div className="right">
                    <button onClick={handleClick}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}

Navbar.propTypes = {
    handleSave: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
};

export default Navbar;

// Made by Sunny Kumar, IIT Guwahati, 2024 (SunnyK9325)
