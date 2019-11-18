import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Panel from './Panel';

configure({ adapter: new Adapter() });

let side, updateSituationByMoveId, loadSessionFromArchive;
let panel = shallow(<Panel side={side} 
                           updateSituationByMoveId={updateSituationByMoveId} 
                           loadSessionFromArchive={loadSessionFromArchive}
                           testRun={true} />);

test('Renders #Panel', () => {
    expect(panel.find('#Panel').length).toBe(1);
});

test('Renders an error box', () => {
    panel.setState({notaitionsError: 'Some error.'});
    expect(panel.find('#Panel #Error').length).toBe(1);
    expect(panel.find('#Panel #Error').text()).toBe('Some error.');
    panel.setState({moves: [1, 2, 3]});
    expect(panel.find('#Panel h3').length).toBe(1);
    expect(panel.find('#Panel h3').text()).toBe('Session History');
});