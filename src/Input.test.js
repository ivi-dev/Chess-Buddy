import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Input from './Input';

configure({ adapter: new Adapter() });

let input;
let notationsList = '1 2';
const parseNotationsList = jest.fn(() => notationsList = '');
const updateNotationsList = jest.fn(() => notationsList = '1 2 3');

describe('Input', () => {
    beforeAll(() => {
        input = shallow(<Input notationsList={notationsList} 
                               parseNotationsList={parseNotationsList} 
                               updateNotationsList={updateNotationsList} />);
    });

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
        expect(notationsList).toBe('');
    });

    test('Changes the value of the notations list', () => {
        input.find("#Input textarea").simulate('change');
        expect(notationsList).toBe('1 2 3');
    });
});