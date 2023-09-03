// Using .find method to search array of author objects for matching id.
function findAuthorById(authors, id) {
  let matchingAuthor = authors.find((author) => author.id === id);
  return matchingAuthor;
}

// Using .find methor to search array of book objects for matching id.
function findBookById(books, id) {
  let matchingBook = books.find((book) => book.id === id);
  return matchingBook;
}

// Function should return an array with two arrays inside of it. First array contains books that are checked out, and the other array contains books that are returned.
function partitionBooksByBorrowedStatus(books) {
  // Assigning two variables; one for each array.
  let borrowed = [];
  let available = [];

  // Using .forEach method to loop through array of book objects.
  books.forEach(book => {
    // Deconstructing 'borrows' array within currently indexed book object.
    let borrowsArray = book.borrows;
    // Using .find method in ternary operator format to find if each book in the 'borrows' array has been returned or not, and adding them to their respective arrays.
    borrowsArray.find(borrow => borrow.returned === false ? borrowed.push(book) : available.push(book));
  })
  // Establishing one last return array that combines our other two arrays.
  let result = [[...borrowed], [...available]];
  return result;
}

// Function should return an array of 10 or fewer account objects that represents the accounts given by the ID's in the provided book's borrows array.
// Each account object returned should include the returned entry from the corresponding transaction object in the 'borrows' array.
function getBorrowersForBook(book, accounts) {
  // Establish return array.
  let result = [];
  // Deconstruct the provided book's 'borrows' array.
  let borrowArray = book.borrows;
  // Using the .forEach method on the 'borrows' array to...
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
