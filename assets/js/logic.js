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

function deleteBooks(title, author) {
  const books = allBooks();

  books.forEach((book, index) => {
    if (book.title === title && book.author === author) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}

// Display on UI

function addBookToList(book) {
  const list = document.querySelector('#main-list');

  const item = document.createElement('li');

  item.innerHTML = `
    <p>${book.title}</p>
    <p>${book.author}</p>
    <button><a href="#" class="removable">remove</a></button>
  `;

  list.appendChild(item);
}

function displayBooks() {
  const books = allBooks();

  books.forEach((book) => addBookToList(book));
}

// Function to delete books from UI

function deleteBooksUI(element) {
  if (element.classList.contains('removable')) {
    element.parentElement.parentElement.remove();
  }
}

// Function for clearing the fields

function clearFields() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
}

// Event for displaying books UI

document.addEventListener('DOMContentLoaded', displayBooks());

// Event for adding books UI

document.querySelector('#main-form').addEventListener('submit', (t) => {
  // Prevent the default action of 'submit' listener because we have no values yet
  t.preventDefault();

  // Get values from form
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Validation

  if (title === '' || author === '') {
    const error = document.createElement('p');
    const location = document.querySelector('#main-form');

    error.innerHTML = `
    <small class="alert">Please fill all the fields</small>
  `;

    location.appendChild(error);
  } else {
    // Create the book in UI

    const book = {};
    book.title = title;
    book.author = author;

    // To UI
    addBookToList(book);

    // To storage
    addBooks(book);

    // Success message
    const success = document.createElement('p');
    const location = document.querySelector('#main-form');

    success.innerHTML = `
    <small class="alert">Book added</small>
  `;
    location.appendChild(success);
    // Clear the fields
    clearFields();
  }

  // Dismiss these alerts after 2 secs
  setTimeout(() => document.querySelector('.alert').remove(), 2000);
});

// Event for removing books from UI
document.querySelector('#main-list').addEventListener('click', (t) => {
  // From UI
  deleteBooksUI(t.target);

  // From storage

  const delTitle = t.target.parentElement.previousElementSibling.previousElementSibling.textContent;

  const delAuthor = t.target.parentElement.previousElementSibling.textContent;

  deleteBooks(delTitle, delAuthor);
});
