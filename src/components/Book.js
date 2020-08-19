import React from 'react';


export default function Book(props) {
    return (
      <div>
        {props.title}{" "}
        <button key={props.title} onClick={props.markAsRead}>
          Mark as Read
        </button>
      </div>
    );
  }
  