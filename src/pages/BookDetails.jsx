import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useFireBaseContext } from "../context/FireBaseContext";

const BookDetails = () => {
    const [bookData, setBookData] = useState(null);
    const [url, setURL] = useState(null);
    const params = useParams();
    const firebaseContext = useFireBaseContext();

    useEffect(() => {
        const getBookData = async () => {
            const result = await firebaseContext.getBookById(params.bookId);
            setBookData(result.data());
            const downloadImageURL = await firebaseContext.getImageURL(result.data().imageURL);
            setURL(downloadImageURL);
        }
        getBookData();

    }, [params.bookId])
    if (bookData == null) return <h1 className='text-white'>Loading...</h1>
    return (
        <div className='max-w-[80%] mt-20 mx-auto text-white flex items-center justify-center gap-24'>
            <div className=' h-95 w-[45%] overflow-hidden'>
                <img className='w-full h-full rounded-2xl' src={url} alt="book-image" />
            </div>
            <div className='h-95 w-[45%]'>
                <h1 className='text-3xl font-semibold'>{bookData.name}</h1>
                <h2 className='text-xl mt-3 mb-1'>Details</h2>
                <p className='text-sm font-thin'>Price: {bookData.price}</p>
                <p className='text-sm font-thin'>ISBN Number: {bookData.isbn}</p>
                <h2 className='text-xl mt-3 mb-1'>Owner Detail</h2>
                <p className='text-sm font-thin'>Email: {bookData.userEmail}</p>
                <p className='text-sm font-thin'>Name: {bookData.displayName}</p>
                <img className='rounded-full h-10 w-10' src={bookData.userPicURL} alt="" />
                <button className='border-none outline-none bg-blue-700 py-2 px-4 rounded-md hover:bg-blue-800 transition-colors active:scale-95 mt-10'>Buy Now</button>
            </div>

        </div>
    )
}

export default BookDetails