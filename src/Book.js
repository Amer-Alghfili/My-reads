import React from "react";
import Options from "./Options";

export default props => {
  const { book, optionChange } = props;
  let noImageStyle;
  if (!book.imageLinks) {
    noImageStyle = {
      width: 128,
      height: 193
    };
  } else {
    noImageStyle = {
      width: 128,
      height: 193,
      backgroundImage: `url(${book.imageLinks.smallThumbnail})`
    };
  }
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={noImageStyle}
          ></div>
          <div className="book-shelf-changer">
            <Options book={book} optionChange={optionChange} />
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
};
