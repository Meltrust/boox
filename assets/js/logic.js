// localStorage

function allBooks() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}

function addBooks(newBook) {
  const getAllBooks = allBooks();
  getAllBooks.push(newBook);
  localStorage.setItem('books', JSON.stringify(getAllBooks));
}

function deleteBooks(index) {
  const getAllBooks = allBooks();

  getAllBooks.splice(index, 1);

  localStorage.setItem('books', JSON.stringify(getAllBooks));
}

// addBooks({ title: 'title2', author: 'author2' });
// deleteBooks(2);
// console.log(allBooks());
// localStorage.clear();
