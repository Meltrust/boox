/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BrowserSave {
  static allBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBooks(newBook) {
    const getAllBooks = BrowserSave.allBooks();
    getAllBooks.push(newBook);
    localStorage.setItem('books', JSON.stringify(getAllBooks));
  }

  static deleteBooks(title, author) {
    const books = BrowserSave.allBooks();

    books.forEach((book, index) => {
      if (book.title === title && book.author === author) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class Onscreen {
  static addBookToList(book) {
    const list = document.querySelector('#main-list');

    const item = document.createElement('li');

    item.innerHTML = `
    <p class="p-0 m-0">"${book.title}" by ${book.author}</p>
    <p class="d-none">${book.title}</p>
    <p class="d-none">${book.author}</p>
    <button><a href="#" class="removable">remove</a></button>
  `;

    list.appendChild(item);
  }

  static displayBooks() {
    const books = BrowserSave.allBooks();

    books.forEach((book) => Onscreen.addBookToList(book));
  }

  static deleteBooksUI(element) {
    if (element.classList.contains('removable')) {
      element.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', Onscreen.displayBooks());

document.querySelector('#main-form').addEventListener('submit', (t) => {
  t.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if (title === '' || author === '') {
    const error = document.createElement('p');
    const location = document.querySelector('#main-form');

    error.innerHTML = `
    <small class="alert">Please fill all the fields</small>
  `;

    location.appendChild(error);
  } else {
    const book = new Book(title, author);

    Onscreen.addBookToList(book);

    BrowserSave.addBooks(book);

    const success = document.createElement('p');
    const location = document.querySelector('#main-form');

    success.innerHTML = `
    <small class="alert">Book added</small>
  `;
    location.appendChild(success);

    Onscreen.clearFields();
  }

  setTimeout(() => document.querySelector('.alert').remove(), 2000);
});

document.querySelector('#main-list').addEventListener('click', (t) => {
  Onscreen.deleteBooksUI(t.target);

  const delTitle = t.target.parentElement.previousElementSibling.previousElementSibling.textContent;

  const delAuthor = t.target.parentElement.previousElementSibling.textContent;

  BrowserSave.deleteBooks(delTitle, delAuthor);
});
