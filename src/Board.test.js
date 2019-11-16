import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Board from './Board';

configure({ adapter: new Adapter() });

function checkSituation(updateSituation, situation, boardData, initialSet, initialSetType) {
    expect(updateSituation).toHaveBeenCalled();
    expect(situation).toHaveLength(boardData.dimensions.height);
    situation.forEach(row => expect(row).toHaveLength(boardData.dimensions.width));
    situation[0].forEach(square => expect(square.piece).toBe(initialSet[initialSetType][square.coordinates]));
    situation[1].forEach(square => expect(square.piece).toBe(initialSet[initialSetType][square.coordinates]));
    situation[6].forEach(square => expect(square.piece).toBe(initialSet[initialSetType][square.coordinates]));
    situation[7].forEach(square => expect(square.piece).toBe(initialSet[initialSetType][square.coordinates]));
}

describe('Board', () => {
    let board;
    let boardData = {
        vCoordinates: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        hCoordinates: ['1', '2', '3', '4', '5', '6', '7', '8'],
        dimensions: { width: 8, height: 8 }
        }
        let initialSet = {
        whitesOnTop: {'A1': 'white-rook', 'B1': 'white-knight', 'C1': 'white-bishop', 'D1': 'white-queen', 'E1': 'white-king', 'F1': 'white-bishop', 'G1': 'white-knight', 'H1': 'white-rook', 
                        'A2': 'white-pawn', 'B2': 'white-pawn', 'C2': 'white-pawn', 'D2': 'white-pawn', 'E2': 'white-pawn', 'F2': 'white-pawn', 'G2': 'white-pawn', 'H2': 'white-pawn',
                        'A7': 'black-pawn', 'B7': 'black-pawn', 'C7': 'black-pawn', 'D7': 'black-pawn', 'E7': 'black-pawn', 'F7': 'black-pawn', 'G7': 'black-pawn', 'H7': 'black-pawn',
                        'A8': 'black-rook', 'B8': 'black-knight', 'C8': 'black-bishop', 'D8': 'black-king', 'E8': 'black-queen', 'F8': 'black-bishop', 'G8': 'black-knight', 'H8': 'black-rook'}, 
        
        blacksOnTop: {'A1': 'black-rook', 'B1': 'black-knight', 'C1': 'black-bishop', 'D1': 'black-queen', 'E1': 'black-king', 'F1': 'black-bishop', 'G1': 'black-knight', 'H1': 'black-rook', 
                        'A2': 'black-pawn', 'B2': 'black-pawn', 'C2': 'black-pawn', 'D2': 'black-pawn', 'E2': 'black-pawn', 'F2': 'black-pawn', 'G2': 'black-pawn', 'H2': 'black-pawn',
                        'A7': 'white-pawn', 'B7': 'white-pawn', 'C7': 'white-pawn', 'D7': 'white-pawn', 'E7': 'white-pawn', 'F7': 'white-pawn', 'G7': 'white-pawn', 'H7': 'white-pawn',
                        'A8': 'white-rook', 'B8': 'white-knight', 'C8': 'white-bishop', 'D8': 'white-king', 'E8': 'white-queen', 'F8': 'white-bishop', 'G8': 'white-knight', 'H8': 'white-rook'}, 
        }
    let situation = [];
    let initialSetType = 'blacksOnTop';
    let updateSituation = jest.fn(sit => situation = sit);

    beforeAll(() => {
        board = shallow(<Board board={boardData} 
                            initialSet={initialSet}
                            initialSetType={initialSetType} 
                            situation={situation}
                            updateSituation={updateSituation} />);
    });

    test('Renders #Board', () => {
        expect(board.find('#Board').length).toBe(1);
    });

    test('Renders #Content inside of #Board', () => {
        expect(board.find('#Board #Content').length).toBe(1);
    });

    test('Renders #FileStrip inside of #Board', () => {
        expect(board.find('#Board #FileStrip').length).toBe(1);
    });

    test('Renders #RankStrip inside of #Board', () => {
        expect(board.find('#Board #RankStrip').length).toBe(1);
    });

    test(`Situation gets updated after the board component is created 
    and the first ranks of the board are correctly set as per 'blacksOnTop' initial set`, () => {
        checkSituation(updateSituation, situation, boardData, initialSet, initialSetType);
    });

    test(`Situation gets updated after the board component is created 
    and the first ranks of the board are correctly set as per 'whitesOnTop' initial set`, () => {
        initialSetType = 'whitesOnTop', situation = [];
        updateSituation.mockClear();
        board = shallow(<Board board={boardData} 
                               initialSet={initialSet}
                               initialSetType={initialSetType} 
                               situation={situation}
                               updateSituation={updateSituation} />);
        checkSituation(updateSituation, situation, boardData, initialSet, initialSetType);
    });
});
