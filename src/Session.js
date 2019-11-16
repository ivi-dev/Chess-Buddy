import React from 'react';
import './Session.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Session(props) {
    return (
        <div className="Session">
            <FontAwesomeIcon icon={faPlay} className="icon" onClick={() => {props.hideSessionsPanel(); 
                                                                            props.updateMoves(props.moves); 
                                                                            props.loadSessionFromArchive(props.movesHistory, props.moves)}} />
            <FontAwesomeIcon icon={faTrash} className="icon danger" onClick={() => props.deleteSession(props.title)} /> 
            <span className={"title"}>{props.title}</span> {props.moves && <span className="number-of-moves">[{props.moves.length} moves]</span>}
        </div>
    );
}

export default Session;
