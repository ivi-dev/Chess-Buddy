import React from 'react';
import Board from './Board';
import './App.css';
import Panel from './Panel';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.board = {
      vCoordinates: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      hCoordinates: ['1', '2', '3', '4', '5', '6', '7', '8'],
      dimensions: { width: 8, height: 8 }
    }
    this.turnMap = {'Whites': 'white-', 'Blacks': 'black-'}
    this.piecesMap = {
      'R': 'rook',
      'N': 'knight',
      'B': 'bishop',
      'K': 'king',
      'Q': 'queen',
      'P': 'pawn'
    }
    this.state = {
      turn: 'Whites',
      initialSet: {
        whitesOnTop: {'A1': 'white-rook', 'B1': 'white-knight', 'C1': 'white-bishop', 'D1': 'white-queen', 'E1': 'white-king', 'F1': 'white-bishop', 'G1': 'white-knight', 'H1': 'white-rook', 
                      'A2': 'white-pawn', 'B2': 'white-pawn', 'C2': 'white-pawn', 'D2': 'white-pawn', 'E2': 'white-pawn', 'F2': 'white-pawn', 'G2': 'white-pawn', 'H2': 'white-pawn',
                      'A7': 'black-pawn', 'B7': 'black-pawn', 'C7': 'black-pawn', 'D7': 'black-pawn', 'E7': 'black-pawn', 'F7': 'black-pawn', 'G7': 'black-pawn', 'H7': 'black-pawn',
                      'A8': 'black-rook', 'B8': 'black-knight', 'C8': 'black-bishop', 'D8': 'black-king', 'E8': 'black-queen', 'F8': 'black-bishop', 'G8': 'black-knight', 'H8': 'black-rook'}, 
        
        blacksOnTop: {'A1': 'black-rook', 'B1': 'black-knight', 'C1': 'black-bishop', 'D1': 'black-queen', 'E1': 'black-king', 'F1': 'black-bishop', 'G1': 'black-knight', 'H1': 'black-rook', 
                      'A2': 'black-pawn', 'B2': 'black-pawn', 'C2': 'black-pawn', 'D2': 'black-pawn', 'E2': 'black-pawn', 'F2': 'black-pawn', 'G2': 'black-pawn', 'H2': 'black-pawn',
                      'A7': 'white-pawn', 'B7': 'white-pawn', 'C7': 'white-pawn', 'D7': 'white-pawn', 'E7': 'white-pawn', 'F7': 'white-pawn', 'G7': 'white-pawn', 'H7': 'white-pawn',
                      'A8': 'white-rook', 'B8': 'white-knight', 'C8': 'white-bishop', 'D8': 'white-king', 'E8': 'white-queen', 'F8': 'white-bishop', 'G8': 'white-knight', 'H8': 'white-rook'}, 
      },
      situation: [],
      movesHistory: [],
      initialSetType: 'blacksOnTop'
    }

    this.recordMoves = this.recordMoves.bind(this);
    this.updateSituation = this.updateSituation.bind(this);
    this.findRankNumber = this.findRankNumber.bind(this);
    this.findFileNumber = this.findFileNumber.bind(this);
    this.updateSituationByMoveId = this.updateSituationByMoveId.bind(this);
    this.loadSessionFromArchive = this.loadSessionFromArchive.bind(this);
  }

  findSquare(situation, coordinates) {
    for (let row of situation) {
      for (let square of row) {
        if (square.coordinates === coordinates) {
          return square;
        }
      }
    }
  }

  findRankNumber(bySquareCoordinates) {
    for (let i = 0; i < this.state.situation.length; i++) {
      const row = this.state.situation[i];
      for (let j = 0; j < row; j++) {
        const square = row[j];
        if (square.coordinates === bySquareCoordinates) {
          return i;
        }
      }
    }
  }

  findFileNumber(bySquareCoordinates) {
    for (let i = 0; i < this.state.situation.length; i++) {
      const row = this.state.situation[i];
      for (let j = 0; j < row; j++) {
        const square = row[j];
        if (square.coordinates === bySquareCoordinates) {
          return j;
        }
      }
    }
  }

  copySituation(situation) {
    let situationCopy = [];
    for (let row of situation) {
      let rowCopy = [];
      for (let square of row) {
        let squareCopy = {};
        for (let key in square) {
          squareCopy[key] = square[key];
        }
        rowCopy.push(squareCopy);
      }
      situationCopy.push(rowCopy);
    }
    return situationCopy;
  }

  copyMovesHistory(history) {
    let historyCopy = [];
    if (history.length > 0)
      for (let entry of history) {
        let entryCopy = {};
        for (let key in entry) {
          entryCopy[key] = entry[key];
        }
        historyCopy.push(entryCopy);
      }
    return historyCopy;
  }

  recordMoves(moves) {
    let i = 0;
    const self = this;
    const reversedMoves = moves.slice().reverse();
    function recordMove(move) {
      self.setState(state => {
        let situationCopy = self.copySituation(state.situation);
        self.findSquare(situationCopy, move.from).piece = null;
        const movedPiece = `${self.turnMap[move.side]}${self.piecesMap[move.piece]}`;
        self.findSquare(situationCopy, move.to).piece = movedPiece;
        let movesHistoryCopy = self.copyMovesHistory(state.movesHistory);
        movesHistoryCopy.push({id: `${move.id}`, situation: situationCopy});
        return {situation: situationCopy, movesHistory: movesHistoryCopy}
      }, () => {
        i++;
        if (i < moves.length) 
          recordMove(reversedMoves[i]);
      });
    }
    recordMove(reversedMoves[i]);
  }

  findSituation(moveId) {
    for (let move of this.state.movesHistory)
      if (move.id === moveId.toString())
        return move.situation;
  }

  updateSituation(situation) {
    this.setState({situation: situation});
  }

  updateSituationByMoveId(id) {
    this.updateSituation(this.findSituation(id));
  }

  loadSessionFromArchive(movesHistory, moves) {
    this.setState({movesHistory: movesHistory}, () => this.updateSituationByMoveId(moves[0].id));
  }

  render() {
    return (
      <div id="App">
        <Board board={this.board} 
               initialSet={this.state.initialSet}
               initialSetType={this.state.initialSetType} 
               situation={this.state.situation}
               updateSituation={this.updateSituation} />
        <Panel side={this.state.turn}
               recordMoves={this.recordMoves} 
               situation={this.state.situation}
               movesHistory={this.state.movesHistory}
               updateSituationByMoveId={this.updateSituationByMoveId}
               loadSessionFromArchive={this.loadSessionFromArchive} />
      </div>
    );
  }
}

export default App;
