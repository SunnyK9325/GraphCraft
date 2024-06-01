import React from "react";
import "./nodesPanel.scss";
import { BiMessageRoundedDetail } from "react-icons/bi";

const NodesPanel = () => {
    // Function to handle the drag start event
    const onDragStart = (event, nodeType) => {
        // Set data to be transferred during the drag-and-drop
        event.dataTransfer.setData('application/reactflow', nodeType);
        // Set the allowed effect to move
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="container">
            <div
                className="msg"
                // Bind the drag start event to the handler function
                onDragStart={(event) => onDragStart(event, 'messageNode')}
                draggable // Make the element draggable
            >
                <div className="icon">
                    <BiMessageRoundedDetail />
                </div>
                <div className="desc">
                    <span>Message</span>
                </div>
            </div>
        </div>
    );
};

export default NodesPanel;

// Made by Sunny Kumar, IIT Guwahati, 2024 (SunnyK9325)
