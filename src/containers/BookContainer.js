import React from 'react';
import Book from '../components/Book';

export default function BookContainer(props) {
    console.log(props)
        return(
            <div>
                <h2>These books are all {props.shelf}</h2>
                {props.books.map((book) => (
                    <Book key={book.id} title={book.volumeInfo.title} shelf={props.shelf} markAsRead={props.markAsRead}/>
                ))}
            </div>
        )
}

