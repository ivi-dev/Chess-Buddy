import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Database from './Database'
import PouchDB from 'pouchdb-browser';

jest.mock('pouchdb-browser');

configure({ adapter: new Adapter() });

let db;
let mockPut;
let mockAllDocs;
let mockGet;

test('Creates a new instance', () => {
    db = new Database();
    expect(PouchDB).toHaveBeenCalled();
    mockPut = PouchDB.mock.instances[0].put = jest.fn(doc => new Promise((res, rej) => {
        if (doc) res(doc); else rej('No doc provided.');
    }));
    mockAllDocs = PouchDB.mock.instances[0].allDocs = jest.fn(() => new Promise(res => {
        res(1)
    }));
    mockGet = PouchDB.mock.instances[0].get = jest.fn(id => new Promise(res => {
        res(id)
    }));
});

test('Inserts a record into the database', () => {
    db.insert({id: 1});
    expect(mockPut).toHaveBeenCalledWith({id: 1});
});

test('Gets all records from the database', () => {
    db.getAll();
    expect(mockAllDocs).toHaveBeenCalled();
});

test('Deletes a record from the database', () => {
    db.delete(1);
    expect(mockGet).toHaveBeenCalledWith(1);
});