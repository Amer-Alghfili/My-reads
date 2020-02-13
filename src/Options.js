import React, { Component } from "react";

export default class extends Component {
  state = {
    value: this.props.book.shelf || "none"
  };

  optionChangeHandler = event => {
    const { value } = event.target;
    this.setState({ value }, () => {
      const { book, optionChange } = this.props;
      optionChange(book, this.state.value);
    });
  };
  render() {
    return (
      <select value={this.state.value} onChange={this.optionChangeHandler}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}
