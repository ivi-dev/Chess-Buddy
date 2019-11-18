import React from 'react';
import './SessionNameInput.css';

function SaveSessionsPanel(props) {
    return (
        <section id="SessionNameInput" className={props.visible ? 'visible' : null}>
            <form onSubmit={props.saveSession}>
                <label>
                    Name:
                    <input type="text" onChange={props.updateSessionName} value={props.sessionName} autoCorrect="false" spellCheck="false" />
                </label>
                <label>
                    Notes:
                    <textarea onChange={props.updateSessionNotes} value={props.sessionNotes} autoCorrect="false" spellCheck="false"></textarea>
                </label>
                {props.dbError && <section id="dbError">{props.dbError}</section>}
                <section id="buttons">
                    <input type="submit" value="Save" onClick={props.saveSession} />
                    <button className="button" onClick={props.toggleSaveSessionPanel}>Back</button>
                </section>
            </form>
        </section>
    );
}

export default SaveSessionsPanel;