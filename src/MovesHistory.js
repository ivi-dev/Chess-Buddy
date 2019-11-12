import React from 'react';
import Move from './Move'
import './MovesHistory.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';

class MovesHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMove: -1
        }
        this.selectMove = this.selectMove.bind(this);
    }

    selectMove(id) {
        if (this.state.selectedMove !== id) {
            this.setState({selectedMove: id}, () => {
                if (this.props.moves.length > 1) {
                    this.props.fadeOutMoves(this.state.selectedMove);
                    this.props.updateSituationByMoveId(id)
                }
            });
        }
        else
            this.setState({selectedMove: id}, () => {
                this.props.resetMovesFade(); 
                this.props.updateSituationByMoveId(id);
            });
    }

    cycleMoves(key) {
        if (this.props.moves.length > 1 && this.state.selectedMove !== -1) {
            if (key === 'up') {
                if (this.state.selectedMove < this.props.moves.length)
                    this.selectMove(this.state.selectedMove + 1);
            } else if(key === 'down') {
                if (this.state.selectedMove > 1)
                    this.selectMove(this.state.selectedMove - 1);
            }
        }
    }
    
    getMoveById(id) {
        for (let move of this.props.moves)
            if (move.id === id) return move;
    }

    render() {
        return (
            <section id="MovesHistory">
                <KeyboardEventHandler handleKeys={['up', 'down']} onKeyEvent={key => this.cycleMoves(key)} />
                {this.props.moves.map(move => <Move key={move.id} notation={move.notation} id={move.id} side={move.side} situation={move.situation} 
                                                    faded={move.faded}
                                                    selectMove={this.selectMove}
                                                    selected={this.state.selectedMove === move.id ? true : false} />)}
            </section>
        );
    }
}

export default MovesHistory;