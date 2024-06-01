import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./settingsPanel.scss";

import { IoMdArrowBack } from "react-icons/io";

const SettingsPanel = ({ onBackClick, nodeData, updateNode }) => {
    
    const [nodeDesc, setNodeDesc] = useState(nodeData.data.label);

    // Update nodeDesc when nodeData changes
    useEffect(() => {
        setNodeDesc(nodeData.data.label);
    }, [nodeData]);

    const handleTextChange = (event) => {
        const newDesc = event.target.value;
        setNodeDesc(newDesc); // Update local state
        updateNode(nodeData.id, newDesc); // Pass updated value to updateNode immediately
    };
    
    return (
        <div className="container">
            <div className="header">
                <div className="icon" onClick={onBackClick}>
                    <IoMdArrowBack />
                </div>
                <div className="title">
                    <span>Message</span>
                </div>
            </div>

            <div className="textHolder">
                <span>Text</span>
                <textarea
                    type="text"
                    value={nodeDesc}
                    onChange={handleTextChange}
                    placeholder="Enter your message here"
                />
            </div>
        </div>
    );
}

SettingsPanel.propTypes = {
    onBackClick: PropTypes.func.isRequired,
    nodeData: PropTypes.object.isRequired,
    updateNode: PropTypes.func.isRequired,
};

export default SettingsPanel;

// Made by Sunny Kumar, IIT Guwahati, 2024 (SunnyK9325)
