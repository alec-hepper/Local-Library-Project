// Using the .find method to search array of account objects to find the account.id that matches inputted id.
function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
}

// Using the .sort method in ternary operator format to sort the accounts alphabetically by last name.
function sortAccountsByLastName(accounts) {
  let sorted = accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
  return sorted;
}

// Function should return a number that represents the number of times the account's ID appears in any book's 'borrows' array.
function getTotalNumberOfBorrows(account, books) {
  // Assigning an accumulator variable.
  let total = 0;
  // Use for/in to loop through array of book objects.
  for (let book in books) {
    // Using a for loop within the for/in loop to loop through the currently indexed book's 'borrows' array.
    for (let i = 0; i < books[book].borrows.length; i++) {
      // Add 1 to the accumulator variable for every matching account id for the currently indexed book we find in the 'borrows' array.
      if (books[book].borrows[i].id === account.id) {
      total += 1;
    }
    }
    // Return the accumulator variable.
  } return total;
}

// Function should return an array of book objects, including author information, that represents all books currently checked out by the given account.
function getBooksPossessedByAccount(account, books, authors) {
  // Establishing return array.
  let booksPossessed = [];
  // Use .forEach method to loop through array of books.
  books.forEach(book => {
    // Destructure 'borrows' array within current indexed book object.
    let borrowsArray = book.borrows;
    // If the given account id is found in the borrows array for the currently indexed book, and if it hasn't been returned yet...
    if (borrowsArray.find(borrow => borrow.id === account.id && borrow.returned === false)) {
      // Add book object to return array.
      booksPossessed.push(book);
    }
  })

  // Use .forEach method to loop through book objects in the return array.
  booksPossessed.forEach(book => {
    // Use .find method to locate matching author id within array of author objects.
    let author = authors.find(person => person.id === book.authorId);
    // Nest author object into the book object in return array.
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
