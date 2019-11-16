import PouchDB from 'pouchdb-browser';

class Database {
    constructor(dbName = 'chess-moves-parser') {
        this.db = new PouchDB(dbName, {auto_compaction: true});
    }

    configure(onChange, onError) {
        this.db.changes({
            live: true,
            since: 'now'
        }).on('change', function (change) {
            onChange();
        }).on('error', function (err) {
            onError();
        });
    }

    insert(doc, successCallback, errorCallback) {
        this.db.put(doc).then(function (response) {
            successCallback(response);
        }).catch(function (err) {
            if (errorCallback) errorCallback(err); 
        });
    }

    getAll(options, successCallback, errorCallback) {
        this.db.allDocs(options).then(function (response) {
            successCallback(response);
        }).catch(function (err) {
            if (errorCallback) errorCallback(err); 
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
        });
    }
}

export default Database;