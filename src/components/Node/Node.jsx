import React from 'react';
import { Handle } from 'reactflow';
import PropTypes from 'prop-types';
import './node.scss';

import { IoLogoWhatsapp } from "react-icons/io";
import { BiMessageRoundedDetail } from "react-icons/bi";

const Node = ({ data }) => {
    return (
        <div className="node">
            <div className="header">
                <div className='left'>
                    <BiMessageRoundedDetail style={{ fontSize: "14px" }} />
                    <span>Send Message</span>
                </div>
                <div className="right">
                    <div className='icon-container'>
                        <IoLogoWhatsapp />
                    </div>
                </div>
            </div>
            <div className="body">
                <span>{data.label}</span>
            </div>
             {/* Define the source and target handles */}
            <Handle type="source" position="right" id="source" />
            <Handle type="target" position="left" id="target" />
        </div>
    );
};

Node.propTypes = {
    data: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }).isRequired,
};

export default Node;


