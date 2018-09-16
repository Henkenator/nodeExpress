const express = require('express');
const bookRouter = express.Router();


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
            res.render('bookListView', {
                nav,
                title: 'Library',
                books
            });
        });
    bookRouter.route('/:id')
        .get((req, res) => {
            const id = req.params.id;
            res.render('bookView', {
                nav,
                title: 'Library',
                book: books[id]
            });
        });
    return bookRouter;
}

module.exports = router;