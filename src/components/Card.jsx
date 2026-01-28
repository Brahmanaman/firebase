import React, { useEffect, useState } from 'react'
import { useFireBaseContext } from "../context/FireBaseContext"
import { useNavigate } from 'react-router';

const Card = ({ book }) => {
    const [url, setURL] = useState(null);
    const firebase = useFireBaseContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!book?.imageURL) return;

        firebase.getImageURL(book.imageURL)
            .then((url) => setURL(url))
            .catch((err) => console.error(err));
    }, [book?.imageURL]);

    return (
        <>
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                    src={url}
                    alt="book-image"
                    className="w-full h-60 object-center"
                />

                <div className="p-4">
                    <h1 className="text-xl font-semibold text-gray-800">{book.name}</h1>

                    <p className="text-gray-600 mt-2">
                        This book has a title <span className="font-medium">{book.name}</span>
                        , and is sold by <span className="font-medium">{book.displayName}</span>.
                        It costs <span className="font-semibold">₹{book.price}</span>.
                    </p>

                    <button
                        className="text-xl cursor-pointer mt-4 w-fit px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition active:scale-95"
                        onClick={(e) => navigate(`/book/view/${book.id}`)}
                    >
                        View
                    </button>
                </div>
            </div>
        </>
    );

}

export default Card