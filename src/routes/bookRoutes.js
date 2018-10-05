const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const bookController = require('../controllers/bookController');


function router(nav) {

    const { getIndex, getById, middleware } = bookController(nav);

    bookRouter.use(middleware);
    bookRouter.route('/')
        .get(getIndex);

    bookRouter.route('/:id')
        .get(getById);
    return bookRouter;
}

module.exports = router;