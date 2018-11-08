import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

class Book extends React.Component {
  constructor(props) { //constructor creates a starting state for the books
  super(props);
  this.state = {
    books: props.book //whenever a new book is created, destruct the books prop and assign it to the state
  }
}

  componentDidMount() {
    console.log(this);
  }

updateBook(shelf) {
  BooksAPI.update(this.state.book, shelf) //call BooksAPI.js
  .then(re => {
    this.setState(state => {
    let copy = state.book;
    copy.shelf = shelf;
    this.setState({ book: copy }); 
  });
});
}

  render() {
    return (
            <li>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks && this.props.book.imageLinks.thumbnail || ""}")` }}></div>
                  <div className="book-shelf-changer">
                    <select value={this.state.book.shelf || "None"} onChange={(e) => { this.updateBook(e.target.value) }}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{this.state.book.title}</div>
                <div className="book-authors">{this.state.book.authors[0] || "No Author"}</div>
                // ^takes the first author in the index and renders them^
                // ^error handling displays a string in case of no author^
              </div>
            </li>
          );
        }
      }

export default Book;
