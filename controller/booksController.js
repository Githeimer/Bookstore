const { ObjectId } = require('mongodb');
const path = require('path');

const { getDb } = require('../model/db');

let db = getDb();

//Get all books!
const getAllBooks = (req, res) => {
    db.collection('books')
        .find()
        .sort({ author: 1 })
        .toArray() // Convert the cursor to an array
        .then((books) => {
            res.status(200).json({ message: "WELCOME TO THE API!", books });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "COULD NOT FETCH THE DOCUMENTS" });
        });
};

//Get a single book!
const getSingleBook = (req, res) => {
    const bookId = req.params.id;

    if (!bookId || !ObjectId.isValid(bookId)) {
        return res.status(400).json({ "Message": "Invalid book ID in the request" });
    }

    db.collection('books')
        .findOne({ _id: new ObjectId(bookId) })
        .then((doc) => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ "Message": "Book not found" });
            }
        })
        .catch((err) => {
            res.status(500).json({ "Message": `COULD NOT FETCH THE DOCUMENT! ${err}` });
        });
};

//post a book!
const postBook = (req, res) => {
    const book = req.body;

    db.collection('books')
        .insertOne(book)
        .then((result) => {
            res.status(201).json({ result });
        })
        .catch((err) => {
            res.status(500).json({ err: "COULD NOT CREATE A DOCUMENT" });
        });
};

//delete a book!
const deleteBook = (req, res) => {
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
        return res.status(400).json({ "error": "Invalid book ID in the request" });
    }

    db.collection('books')
        .deleteOne({ _id: new ObjectId(bookId) })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: "Could NOT DELETE THE DOCUMENT!" });
        });
};

//update a book!
const updateBook = (req, res) => {
    const bookId = req.params.id;
    const updates = req.body;

    if (!ObjectId.isValid(bookId)) {
        return res.status(400).json({ error: "Invalid book ID in the request" });
    }

    db.collection('books')
        .updateOne({ _id: new ObjectId(bookId) }, { $set: updates })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: "COULD NOT UPDATE DOCUMENT!" });
        });
};

module.exports = {
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    postBook
};
