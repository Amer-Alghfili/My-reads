import React from "react";
import BooksShelfs from "./BookShelfs";
import Search from "./Search";
import "./App.css";
import { Route, Link } from "react-router-dom";

export default class extends React.Component {

  render() {
    return (
      <div className="app">
        <Route path="/search" exact component={Search} />
        <Route path="/" exact component={BooksShelfs} />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
