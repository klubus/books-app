('use strict');
{
  const select = {
    booksList: '.books-list',
    templateBook: '#template-book',
    bookImage: '.book__image',
  };

  const books = dataSource.books;
  let favoriteBooks = [];

  const template = Handlebars.compile(
    document.querySelector('#template-book').innerHTML
  );

  function render() {
    for (const book of books) {
      const generatedHTML = template(book);
      book.element = utils.createDOMFromHTML(generatedHTML);
      document.querySelector(select.booksList).appendChild(book.element);
    }
  }

  function initActions() {
    const books = document.querySelectorAll('.books-list .book__image');

    for (const element of books) {
      element.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const dataId = element.dataset.id;
        if (favoriteBooks.includes(dataId)) {
          element.classList.remove('favorite');
          favoriteBooks = favoriteBooks.filter((id) => id !== dataId);
        } else {
          element.classList.add('favorite');
          favoriteBooks.push(dataId);
        }
      });
    }
  }

  render();
  initActions();
}
