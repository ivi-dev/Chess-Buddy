import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import MovesHistory from './MovesHistory';

configure({ adapter: new Adapter() });

let moves = [{id: 1}, {id: 2}, {id: 3}];
let movesHistory = shallow(<MovesHistory moves={moves} />);

test('Renders #MovesHistory', () => {
    expect(movesHistory.find('#MovesHistory').length).toBe(1);
});