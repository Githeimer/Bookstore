const express=require('express');
const router=express.Router();
const booksController=require('../../controller/booksController');

router.route('/')
    .get(booksController.getAllBooks)
    .post(booksController.postBook)

    router.route('/:id')
    .get(booksController.getSingleBook)
    .delete(booksController.deleteBook)
    .patch(booksController.updateBook)

    module.exports=router;