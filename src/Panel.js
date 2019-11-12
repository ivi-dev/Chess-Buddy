import React from 'react';
import Input from './Input'
import Buttons from './Buttons'
import SessionNameInput from './SessionNameInput'
import SessionsPanel from './SessionsPanel'
import './Panel.css';
import MovesHistory from './MovesHistory';
import Database from './Database';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.notationMinLength = 5;
        this.notationMaxLength = 5;
        this.db = null;
        this.state = {
            moves: [],
            notationsList: '',
            error: '',
            dbError: '',
            sessionsPanelVisible: false,
            saveSessionInputVisible: false,
            sessions: [{id: 1, title: 'Session'}, {id: 2, title: 'Session'}, {id: 3, title: 'Session'}],
            sessionName: '',
            sessionNotes: '',
            confirm: true
        }
        this.updateNotationsList = this.updateNotationsList.bind(this);
        this.parseNotationsList = this.parseNotationsList.bind(this);
        this.openSessionsPanel = this.openSessionsPanel.bind(this);
        this.hideSessionsPanel = this.hideSessionsPanel.bind(this);
        this.openSaveSessionInput = this.openSaveSessionInput.bind(this);
        this.hideSaveSessionInput = this.hideSaveSessionInput.bind(this);
        this.updateSessionName = this.updateSessionName.bind(this);
        this.updateSessionNotes = this.updateSessionNotes.bind(this);
        this.fadeOutMoves = this.fadeOutMoves.bind(this);
        this.resetMovesFade = this.resetMovesFade.bind(this);
        this.saveSession = this.saveSession.bind(this);
        this.updateMoves = this.updateMoves.bind(this);
        this.deleteSession = this.deleteSession.bind(this);
    }

    componentDidMount() {
        this.db = new Database();
        this.updateSessionsList();
    }

    updateNotationsList(event) {
        this.setState({error: ''});
        this.setState({notationsList: event.target.value});
    }

    validateNotation(notation) {
        const minLength = this.notationMinLength, maxLength = this.notationMaxLength;
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

    parseNotationsList(event) {
        event.preventDefault();
        if (this.state.notationsList.length > 0) {
            const notations = this.state.notationsList.trim().split(/\n/);
            let allNotationsValid = true;
            for (let notation of notations)
                if (!this.validateNotation(notation.replace(/\s*/g, ''))) {
                    allNotationsValid = false;
                    this.setState({error: `Invalid notation: '${notation}'`});
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
            this.setState({error: 'Nothing to parse.'});
        }
    }

    openSessionsPanel() {
        this.setState({sessionsPanelVisible: true});
    }

    hideSessionsPanel() {
        this.setState({sessionsPanelVisible: false});
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

    openSaveSessionInput() {
        this.setState({saveSessionInputVisible: true});
    }

    hideSaveSessionInput(event) {
        if (event) event.preventDefault();
        this.setState({saveSessionInputVisible: false, sessionName: '' , sessionNotes: ''});
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
        this.db.insert({id: this.getLatestSessionId() + 1, 
                        _id: this.state.sessionName, 
                        notes: this.state.sessionNotes, 
                        moves_count: this.state.moves.length, 
                        moves: this.state.moves,
                        moves_history: this.props.movesHistory,
                        date_saved: Date()},
                        () => {
                            this.setState({sessionName: '', sessionNotes: ''}, () => this.hideSaveSessionInput()); 
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
        this.setState({moves: moves});
    }

    deleteSession(title) {
        this.db.delete(title, () => {this.updateSessionsList()});
    }

    render() {
        return (
            <aside id="Panel">
                <Input notationsList={this.state.notationsList} updateNotationsList={this.updateNotationsList} 
                       parseNotationsList={this.parseNotationsList} />
                {this.state.error && <div id="Error">{this.state.error}</div>}
                <h3>{this.state.moves.length !== 0 && 'Session History'}</h3>
                {this.state.error && <hr />}
                <MovesHistory moves={this.state.moves} side={this.props.side} 
                              updateSituationByMoveId={this.props.updateSituationByMoveId} 
                              fadeOutMoves={this.fadeOutMoves} 
                              resetMovesFade={this.resetMovesFade} />
                <Buttons openSessionsPanel={this.openSessionsPanel} openSaveSessionInput={this.openSaveSessionInput} moves={this.state.moves} />
                <SessionNameInput visible={this.state.saveSessionInputVisible} hideSaveSessionInput={this.hideSaveSessionInput} 
                                  sessionName={this.state.sessionName} 
                                  sessionNotes={this.state.sessionNotes} 
                                  updateSessionName={this.updateSessionName} 
                                  updateSessionNotes={this.updateSessionNotes} 
                                  saveSession={this.saveSession}
                                  dbError={this.state.dbError} />
                <SessionsPanel visible={this.state.sessionsPanelVisible} 
                               sessions={this.state.sessions} 
                               hideSessionsPanel={this.hideSessionsPanel} 
                               loadSessionFromArchive={this.props.loadSessionFromArchive} 
                               updateMoves={this.updateMoves} 
                               deleteSession={this.deleteSession}
                               confirm={this.state.confirm} />
            </aside>
        );
    }
}

export default Panel;