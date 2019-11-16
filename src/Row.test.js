import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Row from './Row';

configure({ adapter: new Adapter() });

let row;
const squares = [{id: 1, coordinates: 'A1', piece: 'white-rook'}, {id: 2, coordinates: 'B1', piece: 'white-qeen'}, {id: 3, coordinates: 'C1', piece: 'white-king'}];

describe('Row', () => {
    test('Remders .Row', () => {
        row = shallow(<Row key={1} row={squares} />);
        expect(row.find('.Row')).toBeTruthy();
    });
});