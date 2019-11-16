import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Square from './Square';

configure({ adapter: new Adapter() });

let square;
let color = 0;
let piece = 'white-rook';

describe('Square', () => {
    test('Remders .Square.black with a piece on it', () => {
        square = shallow(<Square color={color} piece={piece} />);
        expect(square.find('.Square.black')).toBeTruthy();
    });

    test('Remders .Square.white with a piece on it', () => {
        color = 1;
        square = shallow(<Square color={color} piece={piece} />);
        expect(square.find('.Square.white')).toBeTruthy();
    });

    test('Remders .Square.black without a piece on it', () => {
        color = 0;
        square = shallow(<Square color={color} piece={null} />);
        expect(square.find('.Square.black')).toBeTruthy();
    });

    test('Remders .Square.white without a piece on it', () => {
        square.setProps({color: 1});
        expect(square.find('.Square.white')).toBeTruthy();
    });
});
