import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from '../Shelf';
import * as BooksAPI from '../../BooksAPI'; //taken from App.js

class MainPage extends React.Component {
  constructor(props) { //constructor creates a starting state for the books
  super(props);
  this.state = {
    books: []
  }
}

  componentDidMount () { //componentDidMount loads all the books we're currently reading
    BooksAPI.getAll()
    .then(re => {
      console.log(re);
      this.setState({ books: re });
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf) //call BooksAPI.js
    .then(re => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            <Shelf updateBook={this.updateBook} name="Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")} />
            <Shelf updateBook={this.updateBook} name="Want to Read" books={this.state.books.filter(b => b.shelf === "wantToRead")} />
            <Shelf updateBook={this.updateBook} name="Read" books={this.state.books.filter(b => b.shelf === "read")} />

          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MainPage;
