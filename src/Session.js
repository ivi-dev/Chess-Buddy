import React from 'react';
import './Session.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Session(props) {
    return (
        <div className="Session">
            <FontAwesomeIcon icon={faPlay} className="icon" onClick={() => {props.updateMoves(props.session.moves); 
                                                                            props.loadSessionFromArchive(props.session.movesHistory, props.session.moves)}} />
            <FontAwesomeIcon icon={faTrash} className="icon danger" onClick={() => props.deleteSession(props.session.title)} /> 
            <span className="title">{props.session.title}</span> {props.session.moves && <span className="number-of-moves">[{props.session.moves.length} moves]</span>}
        </div>
    );
}

export default Session;
