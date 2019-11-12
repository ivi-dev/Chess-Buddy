import PouchDB from 'pouchdb-browser';

class Database {
    constructor(dbName = 'chess-moves-parser') {
        this.db = new PouchDB(dbName, {auto_compaction: true});
        this.db.changes({
            live: true,
            since: 'now'
        }).on('change', function (change) {
            console.log(`DB_EVENT::There was a change in the local database. Something was inserted, removed or updated.`);
        }).on('error', function (err) {
            console.log('DB_EVENT::There was an error during a database operation.');
        });
    }

    insert(doc, successCallback, errorCallback) {
        this.db.put(doc).then(function (response) {
            successCallback(response);
        }).catch(function (err) {
            if (errorCallback) errorCallback(err); 
            // else console.log('There was an error while trying to insert a record into the database', err);
        });
    }

    getAll(options, successCallback, errorCallback) {
        this.db.allDocs(options).then(function (response) {
            successCallback(response);
        }).catch(function (err) {
            if (errorCallback) errorCallback(err); 
            // else console.log('There was an error while trying to insert a record into the database', err);
        });
    }

    delete(id, successCallback, errorCallback) {
        const self = this;
        this.db.get(id).then(function(doc) {
           return self.db.remove(doc);
        }).then(function(res) {
            successCallback(res);
        }).catch(function (err) {
            if (errorCallback) errorCallback(err); 
            // else console.log('There was an error while trying to insert a record into the database', err);
        });
    }
}

export default Database;