import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Session from './Session';

configure({ adapter: new Adapter() });

const sessionData = {title: 'Session', moves: [1, 2, 3]};
let session = shallow(<Session session={sessionData} />);

test('Remders .Session', () => {
    expect(session.find('.Session').length).toBe(1);
});

test('Remders the title of the session', () => {
    expect(session.find('.Session .title').text()).toBe(sessionData.title);
});

test('Remders the number of moves', () => {
    expect(session.find('.Session .number-of-moves').text()).toBe(`[${sessionData.moves.length} moves]`);
});

