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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (shelf, updatedBook) => {
    return BooksAPI.update(updatedBook, shelf).then(() => {
      updatedBook.shelf = shelf
      this.setState({books: this.state.books.filter((book) => book.id !== updatedBook.id).concat(updatedBook)})
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