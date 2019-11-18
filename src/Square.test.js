import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Square from './Square';

configure({ adapter: new Adapter() });

let squareData = {color: 1, piece: 'white-rook'};
let square = shallow(<Square square={squareData} />);

test('Renders .Square.white with a piece on it', () => {
    expect(square.find('.Square.white').length).toBe(1);
    expect(square.find('.Square.white img').length).toBe(1);
});

test('Renders .Square.black with a piece on it', () => {
    squareData.color = 0;
    square = shallow(<Square square={squareData} />);
    expect(square.find('.Square.black').length).toBe(1);
    expect(square.find('.Square.black img').length).toBe(1);
});

test('Renders .Square.white without a piece on it', () => {
    squareData.color = 1;
    squareData.piece = null;
    square = shallow(<Square square={squareData} />);
    expect(square.find('.Square.white').length).toBe(1);
    expect(square.find('.Square.white img').length).toBe(0);
});

test('Renders .Square.black without a piece on it', () => {
    squareData.color = 0;
    squareData.piece = null;
    square = shallow(<Square square={squareData} />);
    expect(square.find('.Square.black').length).toBe(1);
    expect(square.find('.Square.black img').length).toBe(0);
});

