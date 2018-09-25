const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');


function router(nav) {
    const books = [
        {
            title: 'something',
            genre: 'action',
            author: 'Joe',
            read: false
        },
        {
            title: 'book2',
            genre: 'drama',
            author: 'Nisse',
            read: true
        },
        {
            title: 'yupps',
            genre: 'action',
            author: 'Henke',
            read: false
        }
    ];

    bookRouter.route('/')
        .get((req, res) => {

            (async function query() {
                const request = new sql.Request();
                const { recordset } = await request.query('select * from books');
                // debug(result);
                res.render('bookListView', {
                    nav,
                    title: 'Library',
                    books: recordset
                });
            }());
        });
    bookRouter.route('/:id')
        .all((req, res, next) => {
            (async function query() {
                const id = req.params.id;
                const request = new sql.Request();
                const { recordset } =
                    await request.input('id', sql.Int, id)
                        .query('select * from books where id = @id');
                // debug(result);
                req.book = recordset[0];
                next();
            }());
        })
        .get((req, res) => {
            res.render('bookView', {
                nav,
                title: 'Library',
                book: req.book
            });
        });
    return bookRouter;
}

module.exports = router;