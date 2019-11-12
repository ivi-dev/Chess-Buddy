import React from 'react';
import './Move.css';

function Move(props) {
    return (
        <div className={`Move ${props.selected ? 'selected' : null} ${props.faded ? 'faded' : null}`} 
             onClick={() => {props.selectMove(props.id)}}>
            <div className="TurnId">#{props.id}</div> <div className={`Side ${props.side}`}></div> {props.notation}
        </div>
    );
}

export default Move;