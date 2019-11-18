import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Move from './Move';

configure({ adapter: new Adapter() });

let move;
let selected = true;
let selectMove = jest.fn(() => selected = 1);
let faded = false;
let id = 1;
let side = 'Whites';
let notation = '123';

move = shallow(<Move selected={selected} 
                        faded={faded} 
                        selectMove={selectMove} 
                        id={id} 
                        side={side} 
                        notation={notation} />);

test('Renders .Move', () => {
    expect(move.find('.Move').length).toBe(1);
});

test('Renders .Move with the \'selected\' property set to true', () => {
    expect(move.find('.Move.selected').length).toBe(1);
});

test('Renders .Move with the \'selected\' property set to false', () => {
    move.setProps({selected: false});
    expect(move.find('.Move.selected').length).toBe(0);
});

test('Renders .Move with the \'faded\' property set to false', () => {
    expect(move.find('.Move.faded').length).toBe(0);
});

test('Renders .Move with the \'faded\' property set to true', () => {
    move.setProps({faded: true});
    expect(move.find('.Move.faded').length).toBe(1);
});

test('Renders .TurnId', () => {
    expect(move.find('.Move .TurnId').length).toBe(1);
});

test('The text inside of .TurnId matches the value of the  \'id\' property', () => {
    expect(move.find('.Move .TurnId').text()).toBe(`#${id}`);
});

test('An element .Side.Whites is rendered', () => {
    expect(move.find(`.Move .Side.${side}`).length).toBe(1);
});

test('An element .Side.Blacks is rendered', () => {
    side = 'Blacks';
    move = shallow(<Move selected={selected} 
                            faded={faded} 
                            selectMove={selectMove} 
                            id={id} 
                            side={side} 
                            notation={notation} />);
    expect(move.find(`.Move .Side.${side}`).length).toBe(1);
});

test('The .Move shows the natation', () => {
    expect(move.find(`.Move`).text()).toBe(`#1  ${notation}`);
});