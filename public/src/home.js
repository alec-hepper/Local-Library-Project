// Easily return the total count of books using .length.
function getTotalBooksCount(books) {
  return books.length;
}

// Same method for accounts.
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// Function should return a number that represents the number of books that are currently checked out at the library.
function getBooksBorrowedCount(books) {
  // Set up accumulating return variable.
  let result = 0;
  // Use the for/in method to loop through the array of books.
  for (let book in books) {
    // Use a for loop within the for/in loop to loop through the currently indexed book's 'borrows' array.
    for (let i = 0; i < books[book].borrows.length; i++) {
      // In our currently indexed book, while looping through the 'borrows' array, if it's returned status is false, add 1 to our accumulator variable.
      if (books[book].borrows[i].returned === false) {
        result += 1;
      }
    }
    // Return the accumulator variable
  } return result;
}

// Function should return an array containing 5 objects or fewer that represents the most common occurring genres, ordered from most common to least common.
function getMostCommonGenres(books) {
  // Establish an accumulator object
  let result = {};
  // Use the .forEach method to loop through the array of books.
  let genre = books.forEach((book) => {
    // If the currently indexed book's genre is null, will set the value of that genre to 1.
    if (result[book.genre] == null) {
        result[book.genre] = 1;
      // If it's not null, we will add 1 to the counter for that genre.
        } else {
          result[book.genre] += 1;
        }
  })
  // Establish return array.
  let countArray = [];
  // Loop through the result object, and use the .entries method to convert the object's 'key: value' pairs into arrays. 
  for (const [key, value] of Object.entries(result)) {
    // Use the .push method to add our key: values into the return array, but now in the proper format of {name: key, count: value}.
    countArray.push({
      'name' : key,
      'count' : value
    });
  }
  // Use the .sort method to arrange the return array to have the genres with the highest count first.
  countArray.sort((a,b) => b.count - a.count);
  // Use the .slice method to cap our return array at 5 objects.
  return countArray.slice(0,5);
}

// Create helper function to help with the upcoming getMostPopularBooks function.
function getBorrows(books) {
  // Use the .map method to create a new array in the desired format.
  return books.map(book => ({name : book.title, count : book.borrows.length}));
}

// Function should return an array containing 5 objects or fewer that represents the most popluar books in the library.
function getMostPopularBooks(books) {
  // Use the helper function to get our array in the proper format.
  let borrows = getBorrows(books);
  // Use the .sort method to rearrange the array to have highest count books first (most popular).
  borrows.sort((a,b) => b.count - a.count);
  // Use the .slice method to cap the return array at 5 objects.
  return borrows.slice(0,5);
}

// Function should return an array containing 5 objects or fewer that represents the most popular authors whose books have been checked out the most.
function getMostPopularAuthors(books, authors) {
  // Use the .map method to create a new array (topAuthors) in the correct format.
  const topAuthors = authors.map(a => ({
    ...a,
    // Create new object with 'bookCount' as a key, and the amount of matching author id's in the books array as the object value.
    bookCount: books.filter(b => b.authorId === a.id).length,
    // Adding new 'borrowCount' key, with the amount of borrows for matching author id as the value.
    borrowCount: books.filter(b => b.authorId === a.id).reduce((acc, cur) => acc + cur.borrows.length, 0)
})).sort((b, a) => a.borrowCount - b.borrowCount);
  // Setting our topAuthors array default value at 5 to cap the amount of returned objects in the array.
topAuthors.length = 5;
  // Use the .map method to reformat our return array's objects into the correct format.
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
