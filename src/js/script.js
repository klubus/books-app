('use strict');

class BooksList {
  constructor() {
    this.initData();
    this.getElements();
    this.render();
    this.initActions();
  }

  initData() {
    this.data = dataSource.books;
    this.favoriteBooks = [];
    this.filters = [];
  }

  getElements() {
    this.select = {
      booksList: document.querySelector('.books-list'),
      templateBook: '#template-book',
      booksPanel: document.querySelector('.books-panel'),
      filters: document.querySelector('.filters'),
    };

    this.template = Handlebars.compile(
      document.querySelector(this.select.templateBook).innerHTML
    );
  }

  determineRatingBgc(rating) {
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
    return background;
  }

  render() {
    for (const book of this.data) {
      const ratingBgc = this.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;

      const generatedHTML = this.template(book);
      book.element = utils.createDOMFromHTML(generatedHTML);

      this.select.booksList.appendChild(book.element);
    }
  }

  initActions() {
    const thisApp = this;

    this.select.booksPanel.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const parent = event.target.offsetParent;

      if (parent.classList.contains('book__image')) {
        const dataId = parent.dataset.id;

        if (thisApp.favoriteBooks.includes(dataId)) {
          parent.classList.remove('favorite');
          thisApp.favoriteBooks = thisApp.favoriteBooks.filter(
            (id) => id !== dataId
          );
        } else {
          parent.classList.add('favorite');
          thisApp.favoriteBooks.push(dataId);
        }
      }
    });

    this.select.filters.addEventListener('click', function (event) {
      const clickedElement = event.target;

      if (
        clickedElement.tagName === 'INPUT' &&
        clickedElement.type === 'checkbox' &&
        clickedElement.name === 'filter'
      ) {
        const value = clickedElement.value;

        if (clickedElement.checked) {
          thisApp.filters.push(value);
        } else {
          thisApp.filters = thisApp.filters.filter(
            (filter) => filter !== value
          );
        }
        thisApp.filterBooks();
      }
    });
  }

  filterBooks() {
    for (const book of this.data) {
      let shouldBeHidden = false;

      for (const filter of this.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = document.querySelector(
        `.book__image[data-id="${book.id}"]`
      );

      if (shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }
}

const app = new BooksList();
app.init();
