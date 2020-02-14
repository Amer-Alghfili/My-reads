import React from "react";
import Options from "./Options";

export default props => {
  const { book, optionChange } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks && book.imageLinks.thumbnail
                  ? `${book.imageLinks.thumbnail}`
                  : `http://via.placeholder.com/128x193?text=No%20Cover`
              })`
            }}
          ></div>
          <div className="book-shelf-changer">
            <Options book={book} optionChange={optionChange} />
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {Array.isArray(book.authors) ? book.authors.join(", ") : ""}
        </div>
      </div>
    </li>
  );
};
