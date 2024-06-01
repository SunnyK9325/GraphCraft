import React, { useState } from "react";
import "./app.scss";

import GraphCraft from "./components/GraphCraft/GraphCraft.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import NodesPanel from "./components/NodesPanel/NodesPanel.jsx";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel.jsx";

const App = () => {
    const [showSettingPanel, setShowSettingPanel] = useState(false);
    const [selectedNode, setSelectedNode] = useState("");
    const [node, setNode] = useState({ id: '', label: '' });
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaveClicked, setSaveClicked] = useState(false);

    const togglePanel = () => {
        setShowSettingPanel(!showSettingPanel);
    }
    // Function to handle the click outside the node
    const handleClickOutsideNode = () => {
        setShowSettingPanel(false);
    }

    const handleNodeClick = (node) => {
        setSelectedNode(node);
        setShowSettingPanel(true);
    }

    const updateNode = (id, label) => {
        setNode({ id, label });
    }

    const handleSave = () => {
        setSaveClicked(true);
    }

    const handleError = (err, message) => {
        setError(err);
        setErrorMessage(message);
    }

    return (
        <div className="app">
            <Navbar handleSave={handleSave} error={error} errorMessage={errorMessage} />
            <div className="content">
                <GraphCraft
                    onAreaClick={handleClickOutsideNode}
                    onNodeClick={handleNodeClick}
                    node={node}
                    saveClick={isSaveClicked}
                    setSaveClick={setSaveClicked}
                    handleError={handleError}
                />
                <div className="nodesPanel">
                    {showSettingPanel
                        ? (
                            <SettingsPanel
                                onBackClick={togglePanel}
                                nodeData={selectedNode}
                                updateNode={updateNode}
                            />
                        ) : (
                            <NodesPanel />
                        )}
                </div>
            </div>
        </div >
    );
}

export default App;


