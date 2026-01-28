import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useFireBaseContext } from "../context/FireBaseContext";

const BookDetails = () => {
    const [bookData, setBookData] = useState(null);
    const params = useParams();
    const firebaseContext = useFireBaseContext();

    useEffect(() => {
        const getBookData = async () => {
            const result = await firebaseContext.getBookById(params.bookId);
            setBookData(result.data());
        }
        getBookData();

    }, [params.bookId])
    return (
        <div>Books details here</div>
    )
}

export default BookDetails