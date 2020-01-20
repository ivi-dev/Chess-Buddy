import React from 'react';
import NotationsInput from './NotationsInput'
import Buttons from './Buttons'
import SessionNameInput from './SessionNameInput'
import SessionsPanel from './SessionsPanel'
import './Panel.css';
import MovesHistory from './MovesHistory';
import Database from './Database';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.notationParams ={
            notationMinLength: 5,
            notationMaxLength: 5
        }
        this.db = null;
        this.state = {
            moves: [],
            notations: '',
            notaitionsError: '',
            dbError: '',
            panels: {
                sessionsPanel: {visible: false},
                saveSessionPanel: {visible: false}
            },
            sessions: [],
            sessionName: '',
            sessionNotes: '',
            confirm: true
        }
        this.updateNotations = this.updateNotations.bind(this);
        this.parseNotations = this.parseNotations.bind(this);
        this.toggleSessionsPanel = this.toggleSessionsPanel.bind(this);
        this.toggleSaveSessionPanel = this.toggleSaveSessionPanel.bind(this);
        this.updateSessionName = this.updateSessionName.bind(this);
        this.updateSessionNotes = this.updateSessionNotes.bind(this);
        this.fadeOutMoves = this.fadeOutMoves.bind(this);
        this.resetMovesFade = this.resetMovesFade.bind(this);
        this.saveSession = this.saveSession.bind(this);
        this.updateMoves = this.updateMoves.bind(this);
        this.deleteSession = this.deleteSession.bind(this);
    }

    componentDidMount() {
        if (!this.props.testRun) {
            this.db = new Database();
            this.db.configure(() => {console.log(`DB_EVENT::There was a change in the local database. Something was inserted, removed or updated.`)},
                            () => {console.log('DB_EVENT::There was an error during a database operation.');});
            this.updateSessionsList();
        }
    }

    updateNotations(event) {
        this.setState({notaitionsError: ''});
        this.setState({notations: event.target.value});
    }

    validateNotation(notation) {
        const minLength = this.notationParams.notationMinLength, maxLength = this.notationParams.notationMaxLength;
        function checkLength() {
            return notation.length >= minLength && notation.length <= maxLength;
        }
        function checkComposition() {
            return notation.match(/^[A-Z-a-z]{1}[A-Z-a-z]{1}\d{1}[A-Za-z]{1}\d{1}/i);
        }
        return checkLength() && checkComposition();
    }

    generateId(collection) {
        if (collection.length === 0)
            return 1;
        else
            return collection[0].id + 1;
    }

    capitalize(notation) {
        const split = notation.split('');
        let capitalizedSplit = [];
        split.forEach((letter, index) => {if (index === 0) capitalizedSplit.push(letter.toUpperCase())
                                          else capitalizedSplit.push(letter.toLowerCase())});
        return capitalizedSplit.join('');
    }

    disectNotation(notation) {
        const split = notation.split('');
        return {piece: split[0].toUpperCase(), from: (split[1] + split[2]).toUpperCase(), 
                to: (split[3] + split[4]).toUpperCase()};
    }

    parseNotations(event) {
        event.preventDefault();
        if (this.state.notations.length > 0) {
            const notations = this.state.notations.trim().split(/\n/);
            let allNotationsValid = true;
            for (let notation of notations)
                if (!this.validateNotation(notation.replace(/\s*/g, ''))) {
                    allNotationsValid = false;
                    this.setState({notaitionsError: `Invalid notation: '${notation}'`});
                    break;
                }
            if (allNotationsValid) {
                let moves = [];
                for (let notation of notations) {
                    const prettyNotation = this.capitalize(notation.replace(/\s*/g, ''));
                    const id = this.generateId(moves);
                    const moveData = this.disectNotation(notation);
                    const move = {id: id, notation: prettyNotation, piece: moveData.piece,
                                  from: moveData.from, to: moveData.to,
                                  side: id % 2 === 0 ? 'Blacks' : 'Whites', 
                                  faded: false};
                    moves.unshift(move);
                }
                this.props.recordMoves(moves);
                this.setState({moves: moves}, () => this.setState({notationsList: ''}));
            }
        } else {
            this.setState({notaitionsError: 'Nothing to parse.'});
        }
    }

    fadeOutMoves(upwardsFromMove) {
        this.setState(state => {
            state.moves.forEach(move => {
                if (move.id > upwardsFromMove) move.faded = true; 
                else move.faded = false;
            });
            return {moves: state.moves}
        });
    }

    resetMovesFade() {
        this.setState(state => {
            state.moves.forEach(move => move.faded = false);
            return {moves: state.moves}
        });
    }

    toggleSaveSessionPanel(event) {
        if (event)
            event.preventDefault();
        this.setState(state => ({panels: {...state.panels, saveSessionPanel: {visible: !state.panels.saveSessionPanel.visible}}, dbError: ''}));
    }

    toggleSessionsPanel() {
        this.setState(state => ({panels: {...state.panels, sessionsPanel: {visible: !state.panels.sessionsPanel.visible}}}));
    }

    updateSessionName(event) {
        this.setState({sessionName: event.target.value});
    }

    updateSessionNotes(event) {
        this.setState({sessionNotes: event.target.value});
    }

    getLatestSessionId() {
        let id = 0;
        this.state.sessions.forEach(session => {
            if (session.id > id) id = session.id;
        });
        return id;
    }

    saveSession(event) {
        event.preventDefault();
        if (!this.state.sessionName.trim()) {
            this.setState({dbError: 'Please, give your session a name first.'});
            return;
        }
        this.db.insert({id: this.getLatestSessionId() + 1, 
                        _id: this.state.sessionName, 
                        notes: this.state.sessionNotes, 
                        moves_count: this.state.moves.length, 
                        moves: this.state.moves,
                        moves_history: this.props.movesHistory,
                        date_saved: Date()},
                        () => {
                            this.setState({sessionName: '', sessionNotes: ''}, () => this.toggleSaveSessionPanel()); 
                            this.updateSessionsList()
                        }, (err) => {
                            if (err.message === 'Document update conflict' && err.status === 409) 
                                this.setState({dbError: `Session '${this.state.sessionName}' already exists, choose another name.`});
                            });
    }

    updateSessionsList() {
        function recreateSessions(dbResult) {
            let sessions = [];
            dbResult.rows.forEach(row => {
                sessions.push({id: row.doc.id, 
                               title: row.doc._id, 
                               movesHistory: row.doc.moves_history, 
                               moves: row.doc.moves});
            });
            return sessions;
        }
        this.db.getAll({include_docs: true}, res => {
            this.setState({sessions: recreateSessions(res)});
        });
    }

    updateMoves(moves) {
        this.setState(state => ({moves: moves, panels: {...state.panels, sessionsPanel: {visible: false}}}));
    }

    deleteSession(title) {
        this.db.delete(title, () => {this.updateSessionsList()});
    }

    render() {
        return (
            <aside id="Panel">
                <NotationsInput notations={this.state.notations} 
                                updateNotations={this.updateNotations} 
                                parseNotations={this.parseNotations} />
                {this.state.notaitionsError && <div id="Error">{this.state.notaitionsError}</div>}
                {this.state.moves.length !== 0 && <h3>Session History</h3>}
                <MovesHistory moves={this.state.moves} 
                              side={this.props.side} 
                              updateSituationByMoveId={this.props.updateSituationByMoveId} 
                              fadeOutMoves={this.fadeOutMoves} 
                              resetMovesFade={this.resetMovesFade} />
                <Buttons toggleSessionsPanel={this.toggleSessionsPanel} 
                         toggleSaveSessionPanel={this.toggleSaveSessionPanel} 
                         moves={this.state.moves} />
                <SessionNameInput visible={this.state.panels.saveSessionPanel.visible} 
                                  toggleSaveSessionPanel={this.toggleSaveSessionPanel} 
                                  sessionName={this.state.sessionName} 
                                  sessionNotes={this.state.sessionNotes} 
                                  updateSessionName={this.updateSessionName} 
                                  updateSessionNotes={this.updateSessionNotes} 
                                  saveSession={this.saveSession}
                                  dbError={this.state.dbError} />
                <SessionsPanel visible={this.state.panels.sessionsPanel.visible} 
                               sessions={this.state.sessions} 
                               toggleSessionsPanel={this.toggleSessionsPanel} 
                               loadSessionFromArchive={this.props.loadSessionFromArchive} 
                               updateMoves={this.updateMoves} 
                               deleteSession={this.deleteSession}
                               confirm={this.state.confirm} />
            </aside>
        );
    }
}

export default Panel;