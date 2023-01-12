/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable indent */
const {
    nanoid,
} = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;
    if (pageCount === readPage) {
        finished = true;
    }

    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const newBooks = {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        id,
        insertedAt,
        updatedAt,
    };
    books.push(newBooks);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllBooksHandler = (request, h) => {
    const bookFiltered = [];
    const {
        finished,
        reading,
        name,
    } = request.query;
    let tempBookFinished = [];
    let tempBookReaded = [];

    if (finished == 1) {
        tempBookFinished = books.filter((book) => book.finished === true);
        const bookFinished = [];
        tempBookFinished.forEach((book) => {
            bookFinished.push({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            });
        });
        const response = h.response({
            status: 'success',
            data: {
                books: bookFinished,
            },
        });
        response.code(200);
        return response;
    }
    if (finished == 0) {
        tempBookFinished = books.filter((book) => book.finished === false);
        const bookFinished = [];
        tempBookFinished.forEach((book) => {
            bookFinished.push({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            });
        });
        const response = h.response({
            status: 'success',
            data: {
                books: bookFinished,
            },
        });
        response.code(200);
        return response;
    }

    if (reading == 1) {
        tempBookReaded = books.filter((book) => book.reading === true);
        const bookReaded = [];
        tempBookReaded.forEach((book) => {
            bookReaded.push({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            });
        });
        const response = h.response({
            status: 'success',
            data: {
                books: bookReaded,
            },
        });
        response.code(200);
        return response;
    }
    if (reading == 0) {
        tempBookReaded = books.filter((book) => book.reading === false);
        const bookReaded = [];
        tempBookReaded.forEach((book) => {
            bookReaded.push({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            });
        });
        const response = h.response({
            status: 'success',
            data: {
                books: bookReaded,
            },
        });
        response.code(200);
        return response;
    }

    if (name !== undefined) {
        if (name.toLowerCase() == 'dicoding') {
            const result = books.filter((book) => book.name.toLowerCase().includes('dicoding'));
            const bookWithDicodingName = [];
            result.forEach((book) => {
                bookWithDicodingName.push({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                });
            });
            const response = h.response({
                status: 'success',
                data: {
                    books: bookWithDicodingName,
                },
            });
            response.code(200);
            return response;
        }
    }

    books.forEach((book) => {
        bookFiltered.push({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        });
    });
    const response = h.response({
        status: 'success',
        data: {
            books: bookFiltered,
        },
    });
    response.code(200);
    return response;
};

const getBookById = (request, h) => {
    const {
        id,
    } = request.params;
    const book = books.filter((book) => book.id === id)[0];
    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const {
        id,
    } = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    const updatedAt = new Date().toISOString();
    let finished = false;
    if (pageCount === readPage) {
        finished = true;
    }

    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const {
        id,
    } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookById,
    editBookByIdHandler,
    deleteBookByIdHandler,
};