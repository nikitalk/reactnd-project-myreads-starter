import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
   books: []
  }

  getAllBooks = () => {
   BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
 }


  componentDidMount() {
    this.getAllBooks();

  }

  updateBook = (shelf, book) => {
   
   return BooksAPI.update(book, shelf).then(() => {
   this.getAllBooks()
   })
  
 
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks 
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />

        )}/>
        <Route path='/search' render={() => (
          <SearchBook 
          books={this.state.books}
          onUpdateBook={this.updateBook}/>
        )}/>         
      </div>
    )
  }
}

export default BooksApp
