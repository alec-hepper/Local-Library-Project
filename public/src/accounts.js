function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
  let sorted = accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
  return sorted;
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  for (let book in books) {
    for (let i = 0; i < books[book].borrows.length; i++) {
      if (books[book].borrows[i].id === account.id) {
      total += 1;
    }
    }
  } return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = [];
  books.forEach(book => {
    let borrowsArray = book.borrows;
    if (borrowsArray.find(borrow => borrow.id === account.id && borrow.returned === false)) {
      booksPossessed.push(book);
    }
  })
  
  booksPossessed.forEach(book => {
    let author = authors.find(person => person.id === book.authorId);
    book['author'] = author;
  })
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
