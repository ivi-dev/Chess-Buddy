import { configure, shallow, simulate } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Buttons from './Buttons';

configure({ adapter: new Adapter() });

let buttons;
const openSaveSessionInput = jest.fn(() => 0);
const openSessionsPanel = jest.fn(() => 1);
let moves = [1, 2, 3];

describe('Buttons', () => {
    test('Remders #Buttons', () => {
        buttons = shallow(<Buttons openSaveSessionInput={openSaveSessionInput} 
                                  openSessionsPanel={openSessionsPanel} 
                                  moves={moves} />);
        expect(buttons.find('#Buttons')).toBeTruthy();
    });

    test('Remders buttons inside #Buttons', () => {
        expect(buttons.find('#Buttons button')).toBeTruthy();
        buttons.find('#Buttons button').forEach((button, id) => {
            if (id === 0) expect(button.prop('disabled')).toBe(false)
            else expect(button.prop('disabled')).toBeUndefined()
        });
        moves = [];
        buttons.setProps({moves: []});
        buttons.find('#Buttons button').forEach((button, id) => {
            if (id === 0) expect(button.prop('disabled')).toBe(true)
            else expect(button.prop('disabled')).toBeUndefined()
        });
    });

    test('Simulate a click on the buttons', () => {
        buttons.find('button').at(0).simulate('click');
        expect(openSaveSessionInput).toHaveBeenCalled();
        expect(openSaveSessionInput).toHaveReturnedWith(0);

        buttons.find('button').at(1).simulate('click');
        expect(openSessionsPanel).toHaveBeenCalled();
        expect(openSessionsPanel).toHaveReturnedWith(1);
    });
});