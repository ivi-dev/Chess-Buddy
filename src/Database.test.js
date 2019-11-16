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
let mockRemove;
// const successCallback = jest.fn(() => 1);
// const errorCallback = jest.fn(() => 0);

describe('Database', () => {
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
        mockRemove = PouchDB.mock.instances[0].remove = jest.fn(() => new Promise(res => {
            res(1)
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
});