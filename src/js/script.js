('use strict');
{
  const select = {
    booksList: '.books-list',
    templateBook: '#template-book',
  };

  const books = dataSource.books;

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

  render();
}
