import React from 'react';
import './Buttons.css';

function Buttons(props) {
    return (
        <section id="Buttons">
            <button onClick={props.openSaveSessionInput} disabled={props.moves.length === 0 ? true : false}>Save Session</button>
            <button onClick={props.openSessionsPanel}>View Sessions</button>
        </section>
    );
}

export default Buttons;