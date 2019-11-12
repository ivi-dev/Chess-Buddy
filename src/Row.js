import React from 'react';
import Square from './Square';
import './Row.css';

function Row(props) {
const squares = props.row.map((square, id) => <Square key={id} color={square.color === 1 ? 'white' : 'black'} piece={square.piece} />);
    return (
        <div className="Row">
            {squares}
        </div>
    );
}

export default Row;