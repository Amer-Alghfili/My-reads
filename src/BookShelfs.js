import React, { Component } from "react";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";

export default class extends Component {
  state = {
    booksShelfs: {},
    books: [],
    shelfs: [
      {
        title: "Currently Read",
        key: "currentlyReading"
      },
      {
        title: "Want to Read",
        key: "wantToRead"
      },
      {
        title: "Read",
        key: "read"
      }
    ],
    loading: true
  };

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({ books: res }, () => {
        this.booksFilter(this.state.books);
      });
    });
  }

  booksFilter = books => {
    const booksShelfs = {};
    for (let shelf of this.state.shelfs) {
      //create new shelf property of type array to the booksShelfs object and add related books to it
      booksShelfs[shelf.key] = books.filter(book => book.shelf === shelf.key);
    }
    this.setState(() => ({ booksShelfs, loading: false }));
  };

  shelfChangeHandler = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    if (shelf !== "none") {
      this.moveBook(book, book.shelf, shelf);
    }
  };

  moveBook = (book, prevShelf, nextShelf) => {
    const booksShelfs = { ...this.state.booksShelfs };
    booksShelfs[prevShelf] = booksShelfs[prevShelf].filter(
      shelfBook => shelfBook.title !== book.title
    );
    book.shelf = nextShelf;
    booksShelfs[nextShelf].push(book);
    this.setState(() => ({ booksShelfs }));
  };

  render() {
    const { booksShelfs } = this.state;
    //check if the opject is empty
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.state.shelfs.map((shelf, i) => {
            return (
              <BookShelf
                key={i}
                shelfTitle={shelf.title}
                books={booksShelfs[shelf.key]}
                optionChange={this.shelfChangeHandler}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
