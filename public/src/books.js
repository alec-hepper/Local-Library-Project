function findAuthorById(authors, id) {
  let matchingAuthor = authors.find((author) => author.id === id);
  return matchingAuthor;
}

function findBookById(books, id) {
  let matchingBook = books.find((book) => book.id === id);
  return matchingBook;
}

function partitionBooksByBorrowedStatus(books) {
  let borrowed = [];
  let available = [];
  
  books.forEach(book => {
    let borrowsArray = book.borrows;
    borrowsArray.find(borrow => borrow.returned === false ? borrowed.push(book) : available.push(book));
  })
  let result = [[...borrowed], [...available]];
  return result;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrowArray = book.borrows;
  borrowArray.forEach(borrow => {
    let account = accounts.find(acc => acc.id === borrow.id);
    let obj = account;
    obj['returned'] = borrow.returned;
    result.push(obj);
  })
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
