import React from 'react';

import './Toggle.css';
import { Hidden } from '../Icons/Icons';

const Toggle = ( props ) => {
    let text = props.hidden ? 'Show' : 'Hide';
    
    return (
        <button className={"Toggle " + text} onClick={props.visible}>
            <Hidden /> {text} {props.children}
        </button>
    );
}

export default Toggle;
