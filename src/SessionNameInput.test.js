import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import SessionNameInput from './SessionNameInput';

configure({ adapter: new Adapter() });

let visible = false;
const saveSession = jest.fn(() => 1);
const updateSessionName = jest.fn(() => sessionName =  'Updated session name');
let sessionName = 'Session';
const updateSessionNotes = jest.fn(() => sessionNotes = 'Updated session notes');
let sessionNotes = 'Notes';
let dbError = '';
const toggleSaveSessionPanel = jest.fn(() => 4);

let sessionNameInput = shallow(<SessionNameInput visible={visible}
                                                 saveSession={saveSession}
                                                 sessionName={sessionName}
                                                 updateSessionName={updateSessionName}
                                                 sessionNotes={sessionNotes}
                                                 updateSessionNotes={updateSessionNotes}
                                                 dbError={dbError}
                                                 toggleSaveSessionPanel={toggleSaveSessionPanel} />);

test('Renders #SessionNameInput', () => {
    expect(sessionNameInput.find('#SessionNameInput').length).toBe(1);
});

test('#SessionNameInput is not visible', () => {
    expect(sessionNameInput.find('#SessionNameInput.visible').length).toBe(0);
});

test('#SessionNameInput is visible', () => {
    sessionNameInput.setProps({visible: true});
    expect(sessionNameInput.find('#SessionNameInput.visible').length).toBe(1);
});

test('Renders a form', () => {
    expect(sessionNameInput.find('#SessionNameInput form').length).toBe(1);
});

test('Renders a text input', () => {
    expect(sessionNameInput.find("#SessionNameInput form label").at(0).find("input[type='text']").length).toBe(1);
});

test('Renders a textarea', () => {
    expect(sessionNameInput.find("#SessionNameInput form label").at(1).find('textarea').length).toBe(1);
});

test('Renders buttons', () => {
    expect(sessionNameInput.find("#SessionNameInput form #buttons input[type='submit']").length).toBe(1);
    expect(sessionNameInput.find("#SessionNameInput form #buttons button").length).toBe(1);
});

test('Submits the form', () => {
    sessionNameInput.find('#SessionNameInput form').simulate('submit');
    expect(saveSession).toHaveBeenCalled();
});

test('Submits the form', () => {
    sessionNameInput.find('#SessionNameInput form').simulate('submit');
    expect(saveSession).toHaveBeenCalled();
});

test('Updates the session name', () => {
    sessionNameInput.find('#SessionNameInput form label').at(0).find("input[type='text']").simulate('change');
    expect(updateSessionName).toHaveBeenCalled();
    expect(sessionName).toBe('Updated session name');
});

test('Updates the session name', () => {
    sessionNameInput.find('#SessionNameInput form label').at(1).find("textarea").simulate('change');
    expect(updateSessionNotes).toHaveBeenCalled();
    expect(sessionNotes).toBe('Updated session notes');
});

test('Tries to save the session', () => {
    sessionNameInput.find("#SessionNameInput form #buttons input[type='submit']").simulate('click');
    expect(saveSession).toHaveBeenCalled();
});

test('Tries to hide the save session input panel', () => {
    sessionNameInput.find("#SessionNameInput form #buttons button").simulate('click');
    expect(toggleSaveSessionPanel).toHaveBeenCalled();
});