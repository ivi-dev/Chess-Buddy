import React from 'react';
import './Square.css';

function Square(props) {
    return (
        <div className={`Square ${props.color}`}>
            {props.piece && <img src={`/images/pieces/${props.piece}.png`} alt={props.piece} />}
        </div>
    );
}

export default Square;