function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = 0;
  for (let book in books) {
    for (let i = 0; i < books[book].borrows.length; i++) {
      if (books[book].borrows[i].returned === false) {
        result += 1;
      }
    }
  } return result;
}

function getMostCommonGenres(books) {
  let result = {};
  let genre = books.forEach((book) => {
    if (result[book.genre] == null) {
        result[book.genre] = 1;
        } else {
          result[book.genre] += 1;
        }
  })
  let countArray = [];
  for (const [key, value] of Object.entries(result)) {
    countArray.push({
      'name' : key,
      'count' : value
    });
  }
  countArray.sort((a,b) => b.count - a.count);
  return countArray.slice(0,5);
}

function getMostPopularBooks(books) {
  const borrows = books.map(book => ({name : book.title, count : book.borrows.length}));
  borrows.sort((a,b) => b.count - a.count);
  return borrows.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  const topAuthors = authors.map(a => ({
    ...a,
    bookCount: books.filter(b => b.authorId === a.id).length,
    borrowCount: books.filter(b => b.authorId === a.id).reduce((acc, cur) => acc + cur.borrows.length, 0)
})).sort((b, a) => a.borrowCount - b.borrowCount);
topAuthors.length = 5;
return topAuthors.map(ta => {
    return {
        count: ta.borrowCount,
        name: ta.name.first + " " + ta.name.last
    };
})
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
