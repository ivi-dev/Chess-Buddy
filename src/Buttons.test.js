import { configure, shallow, simulate } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Buttons from './Buttons';

configure({ adapter: new Adapter() });

let buttons;
const toggleSaveSessionPanel = jest.fn(() => 0);
const toggleSessionsPanel = jest.fn(() => 1);
let moves = [1, 2, 3];

describe('Buttons', () => {
    test('Remders #Buttons', () => {
        buttons = shallow(<Buttons toggleSaveSessionPanel={toggleSaveSessionPanel} 
                                  toggleSessionsPanel={toggleSessionsPanel} 
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
        expect(toggleSaveSessionPanel).toHaveBeenCalled();
        expect(toggleSaveSessionPanel).toHaveReturnedWith(0);

        buttons.find('button').at(1).simulate('click');
        expect(toggleSessionsPanel).toHaveBeenCalled();
        expect(toggleSessionsPanel).toHaveReturnedWith(1);
    });
});