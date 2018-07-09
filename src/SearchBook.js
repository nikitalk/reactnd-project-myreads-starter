import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class SearchBook extends Component {
 state = {
      query: '',
      books: []
    }



   

    updateQuery = (query) => {

      
      this.setState({ query })
  
   BooksAPI.search(query.trim()).then((books) => {
    
   this.addShelf(books)
    this.setState({ books })
    })

    }


    addShelf = (books) => {

console.log(this.props.books)
console.log(books)

    books.forEach((book) => {

      let index = this.props.books.findIndex((book2) => {return book2.id === book.id})
      console.log(index)
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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" value={this.state.query} placeholder="Search by title or author"
                  onChange={(e) => this.updateQuery(e.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">

{(this.state.books !== undefined) && (this.state.books.length > 0) && (
 
                this.state.books.map((book) => (
            
                    <li key={book.id}>


                      <Book 
                        book={book}
                        onUpdating={onUpdateBook}
                        />



                    </li>
                    ))                )}

              </ol>
            </div>
          </div>

			)

	}

}

export default SearchBook