import React from "react";
import Book from "./Book";

export default props => {
  const { shelfTitle, books, optionChange } = props;
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books ? books.map(book => {
              return <Book key={book.id} book={book} optionChange={optionChange}/>;
            }) : <h1>There is no books here !</h1>}
          </ol>
        </div>
      </div>
    </div>
  );
};
