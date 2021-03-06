import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class ListBooks extends Component {

	render() {

		const { books, onUpdateBook } = this.props

    const bookShelf = [
      {
        title: 'Currently Reading',
        type: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        type: 'wantToRead'
      },
      {
        title: 'Read',
        type: 'read'
      }]

		return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelf.map(shelf => (
				      <div className="bookshelf" key={shelf.type}>
               	<h2 className="bookshelf-title">{shelf.title}</h2>
               	<div className="bookshelf-books">
					        <ol className="books-grid">
              			{books.filter((book) => book.shelf === shelf.type).map((book) => (
              			  <li key={book.id}>
                        <Book 
                          book={book}
                          onUpdating={onUpdateBook}
                        />
              			  </li>
		              	))}
                	</ol>
                </div>
            	</div>
           	))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
  	)
	}
}

export default ListBooks