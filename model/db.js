const { MongoClient } = require('mongodb');

let dbConnection;

const connectToDb = (cb) => {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';

    MongoClient.connect(MONGODB_URI)
        .then((client) => {
            dbConnection = client.db();
            return cb();  // call the callback without an error
        })
        .catch((err) => {
            console.error(err);
            return cb(err);  // call the callback with an error
        });
};

const getDb = () => dbConnection;

module.exports = {
    connectToDb,
    getDb,
};
