import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import NotationsInput from './NotationsInput';

configure({ adapter: new Adapter() });

let input;
let notations = '1 2';
const parseNotations = jest.fn(() => notations = '');
const updateNotations = jest.fn(() => notations = '1 2 3');

input = shallow(<NotationsInput notations={notations} 
                        parseNotations={parseNotations} 
                        updateNotations={updateNotations} />);

test('Renders #Input', () => {
    expect(input.find('#Input').length).toBe(1);
});

test('Renders a textarea', () => {
    expect(input.find('#Input textarea').length).toBe(1);
    });

test('Renders a submit button inside #Input', () => {
    expect(input.find("#Input input[type='submit']").length).toBe(1);
});

test('Empties out the notations list', () => {
    input.find("#Input").simulate('submit');
    expect(notations).toBe('');
});

test('Changes the value of the notations list', () => {
    input.find("#Input textarea").simulate('change');
    expect(notations).toBe('1 2 3');
});