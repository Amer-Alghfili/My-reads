import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import { DebounceInput } from "react-debounce-input";

export default class extends Component {
  state = {
    input: "",
    searchedBooks: [],
    myBooks: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState(() => ({
        myBooks: res
      }));
    });
  }

  inputChangeHandler = event => {
    const { value } = event.target;
    this.setState({ input: value }, () => {
      if (this.state.input !== "") {
        BooksAPI.search(this.state.input).then(res => {
          this.changeBooksOptionsToCurrentShelfs(res);
          this.setState(() => ({
            searchedBooks: res
          }));
        });
      } else {
        this.setState(() => ({
          searchedBooks: []
        }));
      }
    });
  };

  changeBooksOptionsToCurrentShelfs = books => {
    if (Array.isArray(books) && books.length > 0 && this.state.myBooks.length > 0) {
      for (let book of books) {
        for (let myBook of this.state.myBooks) {
          if (book.id === myBook.id) {
            book.shelf = myBook.shelf;
          }
        }
      }
    }
  };

  shelfChangeHandler = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
  };
  render() {
    const { searchedBooks } = this.state;
    let result;
    if (!Array.isArray(searchedBooks) || searchedBooks.length === 0) {
      result = <h1>No Results</h1>;
    } else {
      result = (
        <ol className="books-grid">
          {this.state.searchedBooks.map(book => {
            return (
              <Book
                key={book.id}
                book={book}
                optionChange={this.shelfChangeHandler}
              />
            );
          })}
        </ol>
      );
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={0}
              debounceTimeout={300}
              onChange={this.inputChangeHandler}
            />
          </div>
        </div>
        <div className="search-books-results">{result}</div>
      </div>
    );
  }
}
