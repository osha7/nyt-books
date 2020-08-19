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

    handleClick = () => {
        //console.log(this.state.page)
        //const newPage = this.state.page === "read" ? "unread" : "read"
        this.setState(prevState => ({page: prevState.page === "read" ? "unread" : "read"}))
    }

    markAsRead = (e) => {
        console.log(this.state.books);
        let weirdBookName = e.target.parentElement.innerText.split(" ");
        let bookName = weirdBookName.slice(0, -3).join(" ");
    
        console.log(bookName);
        let book = this.state.books.find(
          (book) => book.volumeInfo.title === bookName
        );
        console.log(book);
    
        this.setState((prevState) => ({
          books: prevState.books.map((bookObj) =>
            bookObj.volumeInfo.title === book.volumeInfo.title
              ? { ...bookObj, read: true }
              : bookObj
          )
        }));
      };

    render() {
        //bonus: how can I only have one bookshelf rendering at a time and toggle back and forth?
        let oppState = this.state.page === "read" ? "Unread" : "Read"
        return (
           <div>
               <button onClick={this.handleClick}>Go To {oppState} Books</button>
               {this.state.page === "unread" ? (
                   <BookContainer books={this.unreadBooks()} shelf={"unread"} markAsRead={this.markAsRead}/>
               ) : (
                   <BookContainer books={this.readBooks()} shelf={"read"} />
               )}
           </div>
        )
    }
}

export default App;

