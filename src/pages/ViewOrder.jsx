import React, { useEffect, useState } from 'react'
import { useFireBaseContext } from '../context/FireBaseContext'
import Card from "../components/Card";

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
            <div className="mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        books.map((book) => {
                            return (
                                <Card book={book} link={`/book/orders/${book.bookId}`} />
                            )
                        })

                    }
                </div>
            </div>
        </>
    )
}

export default ViewOrder