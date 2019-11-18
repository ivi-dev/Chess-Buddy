import React from 'react';
import './Buttons.css';

function Buttons(props) {
    return (
        <section id="Buttons">
            <button onClick={props.toggleSaveSessionPanel} disabled={props.moves.length === 0 ? true : false}>Save Session</button>
            <button onClick={props.toggleSessionsPanel}>View Sessions</button>
        </section>
    );
}

export default Buttons;