import React, { useEffect, useState } from 'react'
import { useFireBaseContext } from "../context/FireBaseContext"

const Card = ({ book }) => {
    const [url, setURL] = useState(null);
    const firebase = useFireBaseContext();

    useEffect(() => {
        if (!book?.imageURL) return;

        firebase.getImageURL(book.imageURL)
            .then((url) => setURL(url))
            .catch((err) => console.error(err));
    }, [book?.imageURL]);

    return (
        <>
            <div>
                <div>
                    <img src={url} alt="book-image" />
                </div>
                <div>
                    <h1>{book.name}</h1>
                    <p>This book has a title {book.name} and this book is sold by {book.displayName} and this book cost {book.price}</p>
                    <button>Go Somewhere</button>
                </div>
            </div>
        </>
    )
}

export default Card