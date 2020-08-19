import React from 'react';

export default function Book(props) {
    return (
        <div>
            {props.title} <button>Mark As Read</button>
        </div>
    )
}
