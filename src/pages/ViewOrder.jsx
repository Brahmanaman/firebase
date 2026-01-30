import React, { useEffect, useState } from 'react'
import { useFireBaseContext } from '../context/FireBaseContext'
import Card from "../components/Card";
import { Link } from 'react-router';

const ViewOrder = () => {
    const [books, setBooks] = useState([])
    const firebaseContext = useFireBaseContext();

    useEffect(() => {
        const fetchMyBooks = async () => {
            const booklist = [];
            const querySnapshot = await firebaseContext.fetchMyBooks();
            querySnapshot && querySnapshot.forEach(doc => {
                booklist.push({
                    bookId: doc.id,
                    ...doc.data()
                });
            });
            setBooks(booklist)
        }
        fetchMyBooks();
    }, []);

    return (
        <>
            <div className="min-h-screen bg-slate-950 px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-800 pb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Your Orders</h1>
                            <p className="text-slate-400 mt-1">Manage and track your book purchases</p>
                        </div>
                        <div className="text-sm font-medium text-slate-500 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
                            Total Orders: <span className="text-blue-400">{books.length}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {books.length > 0 ? (
                            books.map((book) => (
                                <div key={book.bookId} className="relative group">
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2 py-1 rounded-md border border-blue-500/30 backdrop-blur-md">
                                            CONFIRMED
                                        </span>
                                    </div>

                                    <Card book={book} link={`/book/orders/${book.bookId}`} />
                                </div>
                            ))
                        ) : (

                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
                                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-white">No orders yet</h2>
                                <p className="text-slate-500 mt-2">Looks like you haven't bought any books yet.</p>
                                <Link to="/" className="mt-6 text-blue-500 hover:text-blue-400 font-medium transition">
                                    Browse the library &rarr;
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewOrder