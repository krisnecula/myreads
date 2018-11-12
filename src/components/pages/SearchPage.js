import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Book from '../Book';

class SearchPage extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    books: [],
    results: [],
    query: ""
  }
}
//constructor creates a starting state for the books

  componentDidMount () {
    BooksAPI.getAll()
    .then(res => {
      this.setState({ books: res });
    });
  }
//componentDidMount loads all the books we're currently reading

  updateQuery = (query) => {
    this.setState({query : query}, this.submitSearch);
  }
//callback once rerender finishes

  submitSearch() {
    if(this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(res => {
      if(res.error) {
        return this.setState({ results: [] });
      }
      else {
        res.forEach(b => {
          let f = this.state.books.filter(B => B.id === b.id);
          b.shelf = f[0] ? f.shelf : null;
          if(f[0]) {
            b.shelf = f[0].shelf;
          }
        });
      return this.setState({ results: res });
      }
    });
  }
//checks if query is empty or undefined
//empties out results list if query is empty
//searches query if it is not empty
//clear results list in case of error
//set results to that list if no error

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(res => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }
//call BooksAPI.js

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.results.map((book, key) => <Book updateBook={this.updateBook} book={book} key={key} />)  }
          </ol>
        </div>
      </div>
    );
  }
}
//swap HTML for Link tag to keep back button functionality
//each time we enter new characters into search,
//call updateQuery and pass in the new event target value

export default SearchPage;
