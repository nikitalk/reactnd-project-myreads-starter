import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends Component {
  state = {
    query: '',
    books: [],
    zeroSearch: false
  }

  updateQuery = (query) => {
    if (query) {
      this.setState({ query })
      BooksAPI.search(query.trim()).then((books) => {
        if (!books.error) { 
          this.addShelf(books)
          this.setState({ books, zeroSearch: false })
        } else this.setState({ books: [], zeroSearch: true })
      })
    } else this.setState({ query: '', books: []})
  }

  addShelf = (books) => {
    books.forEach((book) => {
      let index = this.props.books.findIndex((book2) => {return book2.id === book.id})
      if (index === -1) {
        book.shelf = "none"
      } else {
        book.shelf = this.props.books[index].shelf
        }
      })
  }

	render () {
    const { onUpdateBook } = this.props

		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={this.state.query} placeholder="Search by title or author"
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">      
          <ol className="books-grid">
            {this.state.zeroSearch && (<div>Books not found</div>)}
            {(this.state.query !== '') && (this.state.books !== undefined) && (
              this.state.books.map((book) => (         
                <li key={book.id}>
                  <Book 
                    book={book}
                    onUpdating={onUpdateBook}
                  />
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
			)
	}
}

export default SearchBook