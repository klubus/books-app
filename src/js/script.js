('use strict');
{
  const select = {
    booksList: '.books-list',
    templateBook: '#template-book',
    bookImage: '.book__image',
    booksPanel: '.books-panel',
    filters: '.filters',
  };

  const books = dataSource.books;
  let favoriteBooks = [];
  let filters = [];

  const template = Handlebars.compile(
    document.querySelector('#template-book').innerHTML
  );

  function determineRatingBgc(rating) {
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }

  function render() {
    for (const book of books) {
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;
      const generatedHTML = template(book);
      book.element = utils.createDOMFromHTML(generatedHTML);
      document.querySelector(select.booksList).appendChild(book.element);
    }
  }

  function initActions() {
    const booksPanel = document.querySelector(select.booksPanel);
    const filter = document.querySelector(select.filters);

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

    filter.addEventListener('click', function (event) {
      const clickedElement = event.target;

      if (
        clickedElement.tagName === 'INPUT' &&
        clickedElement.type === 'checkbox' &&
        clickedElement.name === 'filter'
      ) {
        const value = clickedElement.value;

        if (clickedElement.checked) {
          filters.push(value);
        } else {
          filters = filters.filter((filter) => filter !== value);
        }
        filterBooks();
        console.log(filters);
      }
    });

    function filterBooks() {
      for (const book of dataSource.books) {
        let shouldBeHidden = false;
        for (const filter of filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const bookImage = document.querySelector(
          '.book__image[data-id="' + book.id + '"]'
        );
        if (shouldBeHidden) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      }
    }
  }

  render();
  initActions();
}
