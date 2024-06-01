import React, { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import PropTypes from 'prop-types';
import CustomNode from '../Node/Node.jsx';

const nodeTypes = {
    messageNode: CustomNode,
};

const initialNodes = [
    {
        id: '1',
        type: 'messageNode',
        position: { x: 450, y: 250 },
        data: { label: 'Welcome Message' },
        style: {}, // Add a style property to manage the node's style
    },
];

const initialEdges = [];

const GraphCraft = ({ onAreaClick, onNodeClick, node, saveClick, setSaveClick, handleError }) => {
    // useState to manage the state of the nodes
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // useState to manage the state of the edges
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    // useState to manage the selected node
    const [selectedNode, setSelectedNode] = useState(null);

    // Function to handle the connection between nodes
    const onConnect = (params) => {
        // Check if the source node already has an outgoing edge
        const sourceHasOutgoingEdge = edges.some((edge) => edge.source === params.source);

        if (sourceHasOutgoingEdge) {
            handleError(true, 'Source node already has an outgoing edge.');
            return;
        }

        if (params.source === params.target) {
            handleError(true, 'Cannot connect a node to itself.');
            return;
        }

        // Check if the edge already exists
        const inverseEdgeExists = edges.some(
            (edge) => edge.source === params.target && edge.target === params.source
        );

        if (inverseEdgeExists) {
            handleError(true, 'Cannot create a circular connection.');
            return;
        }
        // Add the edge
        setEdges((eds) => addEdge(params, eds));
    };

    // Function to handle the drop event
    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = event.target.getBoundingClientRect();
        // Made by Sunny Kumar, IIT Guwahati, 2024 (SunnyK9325)
        const type = event.dataTransfer.getData('application/reactflow');
        const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        };
        const newNode = {
            id: (nodes.length + 1).toString(),
            type,
            position,
            data: { label: 'Your custom text here' },
            style: {},
        };

        setNodes((nds) => nds.concat(newNode));
    };

    // Function to handle the drag over event
    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    // Function to handle the click event outside nodes
    const handleClick = (event) => {
        const clickedElement = event.target;
        const isNode = clickedElement.closest('.react-flow__node');
        if (!isNode) {
            onAreaClick();
            setSelectedNode(null); // Deselect node if clicking outside
        }
    };

    // Function to handle the click event on nodes
    const handleNodeClick = (event, node) => {
        onNodeClick(node);
        setSelectedNode(node.id); // Set the selected node
        event.stopPropagation(); // Prevent triggering handleClick for area clicks
    };

    // Update node labels when node prop changes
    useEffect(() => {
        if (node.id) {
            setNodes((prevNodes) =>
                prevNodes.map((prevNode) => {
                    if (prevNode.id === node.id) {
                        return {
                            ...prevNode,
                            data: { ...prevNode.data, label: node.label },
                        };
                    }
                    return prevNode;
                })
            );
        }
    }, [node, setNodes]);

    // Check flow conditions when saveClick prop changes
    useEffect(() => {
        if (saveClick) {
            const nodeIdsWithEdges = new Set();

            // Collect node IDs that have incoming or outgoing edges
            edges.forEach(edge => {
                nodeIdsWithEdges.add(edge.source);
                nodeIdsWithEdges.add(edge.target);
            });

            const nodesWithEdgesCount = Array.from(nodeIdsWithEdges).length;

            // Check if there is only one node and no edges
            if (nodes.length === 1 && edges.length === 0) {
                handleError(false, 'Saved successfully');
                // Made by Sunny Kumar, IIT Guwahati, 2024 (SunnyK9325)
            } else if (nodesWithEdgesCount < nodes.length) {
                handleError(true, 'Cannot save flow');
            } else {
                handleError(false, 'Saved successfully');
            }
            setSaveClick(false);
        }
    }, [saveClick, nodes, edges, setSaveClick, handleError]);

    // Update node styles when selectedNode prop changes
    useEffect(() => {
        setNodes((prevNodes) =>
            prevNodes.map((node) => ({
                ...node,
                style: node.id === selectedNode ? { border: '2px solid #677AEC', borderRadius: '8px' } : {},
            }))
        );
    }, [selectedNode, setNodes]);

    return (
        <div className='graphCraft'>
            <div
                style={{ width: '100vw', height: '100vh' }}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onClick={handleClick}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    // Made by Sunny Kumar, IIT Guwahati, 2024 (SunnyK9325)
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    onNodeClick={handleNodeClick}
                />
            </div>
        </div>
    );
};

GraphCraft.propTypes = {
    onAreaClick: PropTypes.func.isRequired,
    onNodeClick: PropTypes.func.isRequired,
    node: PropTypes.object.isRequired,
    saveClick: PropTypes.bool.isRequired,
    setSaveClick: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
};

export default GraphCraft;

// Made by Sunny Kumar, IIT Guwahati, 2024 (SunnyK9325)


