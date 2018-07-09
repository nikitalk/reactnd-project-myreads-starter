import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  state = {
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