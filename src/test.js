if (finished === 1) {
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
} else if (finished === 0) {
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
} else if (reading === 1) {
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
} else if (reading === 0) {
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