import React from 'react';
import '../css/App.css';

import BookContainer from "./BookContainer";


class App extends React.Component {
     //two reasons to use class over functional
  //1. use of state
  //2. lifecycle methods

  // constructor(props){
  //   super(props)
  //   this.state = {}
  // }
    state = {
        books: [],
        page: "unread"
    }

    componentDidMount() {
        fetch("https://www.googleapis.com/books/v1/volumes?q=dogs")
        .then(res => res.json())
        .then((booksObj) => {
            console.log(booksObj)
            let books = booksObj.items.map((book) => ({...book, read: false}))
            this.setState({ books }, () => console.log(this.state))
        })
    }

    unreadBooks() {
        return this.state.books.filter((book) => !book.read)
    }

    readBooks() {
        return this.state.books.filter((book) => book.read)
    }

    render() {
        //bonus: how can I only have one bookshelf rendering at a time and toggle back and forth?
        return (
           <div>
               {this.state.page === "unread" ? (
                   <BookContainer books={this.unreadBooks()} shelf={"unread"} />
               ) : (
                   <BookContainer books={this.readBooks()} shelf={"read"} />
               )}
           </div>
        )
    }
}

export default App;

