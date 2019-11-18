import React from 'react';
import './SessionsPanel.css';
import Session from './Session'

class SessionsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <section id="SessionsPanel" className={this.props.visible ? 'visible' : null}>
                <section id="SessionsList">
                    {this.props.sessions.length > 0 && this.props.sessions.map(session => <Session key={session.id} 

                                                                                                   session={session}

                                                                                                   updateMoves={this.props.updateMoves}
                                                                                                   loadSessionFromArchive={this.props.loadSessionFromArchive} 
                                                                                                   toggleSessionsPanel={this.props.toggleSessionsPanel}
                                                                                                   deleteSession={this.props.deleteSession}
                                                                                                   confirm={this.props.confirm} />)}
                    {this.props.sessions.length === 0 && <div id="no-sessions">No stored sessions</div>}
                </section>
                <section id="Buttons">
                    <button className="button" onClick={this.props.toggleSessionsPanel}>Back</button>
                </section>
            </section>
        );
    }
}

export default SessionsPanel;