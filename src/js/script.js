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
    const booksPanel = document.querySelector('.books-panel');

    booksPanel.addEventListener('dblclick', function (event) {
      event.preventDefault();

      const parent = event.target.offsetParent;

      if (parent.classList.contains('book__image')) {
        const dataId = event.target.offsetParent.dataset.id;

        if (favoriteBooks.includes(dataId)) {
          parent.classList.remove('favorite');
          favoriteBooks = favoriteBooks.filter((id) => id !== dataId);
        } else {
          parent.classList.add('favorite');
          favoriteBooks.push(dataId);
        }
      }
    });
  }

  render();
  initActions();
}
