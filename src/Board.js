import React from 'react';
import Row from './Row'
import './Board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.setBoard();
    }

    setBoard() {
        let hCoordinate = -1, color = 1, situation = [];
        for (let index = 0; index < this.props.board.vCoordinates.length; index++) {
            let row = [], vCoordinate = -1; hCoordinate++;
            for (let index = 0; index < this.props.board.hCoordinates.length; index++) {
                vCoordinate++; 
                const coordinate = `${this.props.board.vCoordinates[vCoordinate]}${this.props.board.hCoordinates[hCoordinate]}`
                row.push({coordinates: coordinate, color: color, piece: this.props.initialSet[this.props.initialSetType][coordinate]}); 
                if (index !== this.props.board.hCoordinates.length - 1) 
                    if (color === 1) color = 0; 
                    else color = 1;
            }
            situation.push(row); 
        }
        this.props.updateSituation(situation);
    }

    getFiles() {
        let files = [];
        if (this.props.situation[0]) {
            const row = this.props.situation[0];
            row.forEach(square => files.push(square.coordinates.split('')[0]));
        }
        return files;
    }

    getRanks() {
        let ranks = [];
        for (let i = 1; i < this.props.situation.length + 1; i++)
            ranks.push(i);
        return ranks;
    }

    render() {
        return (
            <div id="Board">
                <div id="Content">
                    {this.props.situation.map((row, id) => <Row key={id} row={row} />)}
                </div>
                <div id="FileStrip" className="strip">
                    {this.getFiles().map((file, id) => <div key={id} className="File">{file}</div>)}
                </div>
                <div id="RankStrip" className="strip">
                    {this.getRanks().map((rank, id) => <div key={id} className="Rank">{rank}</div>)}
                </div>
            </div>
        );
    }
}

export default Board;