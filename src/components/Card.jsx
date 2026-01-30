import React, { useEffect, useState } from 'react'
import { useFireBaseContext } from "../context/FireBaseContext"
import { useNavigate } from 'react-router';

const Card = ({ book, link }) => {
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
            <div className="group aspect-square w-full flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 hover:border-slate-700 hover:shadow-blue-500/5">

                <div className="h-[55%] w-full overflow-hidden border-b border-slate-800">
                    <img
                        src={url}
                        alt="book-image"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="h-[45%] p-4 flex flex-col justify-between bg-slate-900">
                    <div>
                        <h1 className="text-lg font-bold text-white truncate leading-tight">
                            {book.name}
                        </h1>

                        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                            Sold by <span className="text-slate-200 font-medium">{book.displayName}</span>.
                            This edition features the title <span className="italic">"{book.name}"</span>.
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="text-xl font-bold text-emerald-400">
                            ₹{book.price}
                        </span>

                        <button
                            className="cursor-pointer px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition active:scale-90"
                            onClick={(e) => navigate(link)}
                        >
                            VIEW
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Card