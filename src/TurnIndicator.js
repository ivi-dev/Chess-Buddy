import React from 'react';
import './TurnIndicator.css';

function TurnIndicator(props) {
    return (
        <div id="TurnIndicator" className={props.side} title={`${props.side}' turn`}></div>
    );
}

export default TurnIndicator;