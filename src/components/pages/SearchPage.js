import React from 'react';
import { Link } from 'react-router-dom';

class SearchPage extends React.Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link> //swap HTML for Link tag to keep back button functionality
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
