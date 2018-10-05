const express = require('express');
const sql = require('mssql');
const bookRouter = express.Router();
const bookService = require('../services/goodReadsServices');

const bookController = require('../controllers/bookController');

function router(nav) {

    const { getIndex, getById, middleware } = bookController(bookService, nav);

    bookRouter.use(middleware);
    bookRouter.route('/')
        .get(getIndex);

    bookRouter.route('/:id')
        .get(getById);
    return bookRouter;
}

module.exports = router;