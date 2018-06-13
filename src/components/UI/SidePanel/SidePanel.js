import React from 'react';

import './SidePanel.css';

const SidePanel = (props) => {
    return (
        <div className="Side_panel" onClick={props.toggle}>
            <div className="Side_panel_inner">
                {props.children}
            </div>
        </div>
    )
}

export default SidePanel;