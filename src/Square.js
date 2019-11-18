import React from 'react';
import './Square.css';

function Square(props) {
    return (
        <div className={`Square ${props.square.color === 1 ? 'white' : 'black'}`}>
            {props.square.piece && <img src={`/images/pieces/${props.square.piece}.png`} alt={props.square.piece} />}
        </div>
    );
}

export default Square;