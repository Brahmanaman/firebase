import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useFireBaseContext } from "../context/FireBaseContext";

const BookDetails = () => {
    const [bookData, setBookData] = useState(null);
    const [qty, setQty] = useState(1);
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

    const placeOrder = async () => {
        try {
            const response = await firebaseContext.placeOrder(params.bookId, qty);
        }
        catch (error) {
            console.error("error in placeing order", error);
        }
    }
    if (bookData == null) return <h1 className='text-white'>Loading...</h1>
    return (
        <div className='min-h-screen bg-slate-950 pt-20 pb-12 px-4'>
            <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24'>

                <div className='w-full md:w-1/2 lg:w-[45%] md:sticky md:top-28'>
                    <div className='flex justify-center bg-slate-900/30 rounded-2xl p-4 border border-slate-800/50 h-96'>
                        <img
                            className='max-w-full max-h-[70vh] w-auto h-auto rounded-lg shadow-2xl object-fill'
                            src={url}
                            alt={bookData.name}
                        />
                    </div>
                </div>

                <div className='w-full md:w-1/2 lg:w-[45%] text-slate-200'>
                    <h1 className='text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight'>
                        {bookData.name}
                    </h1>

                    <div className='mt-8 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm'>
                        <h2 className='text-sm uppercase tracking-widest text-blue-400 font-bold mb-4'>Details</h2>
                        <div className='space-y-3'>
                            <div className='flex justify-between'>
                                <span className='text-slate-400'>Price</span>
                                <span className='text-2xl font-bold text-emerald-400'>₹{bookData.price}</span>
                            </div>
                            <div className='flex justify-between border-t border-slate-800 pt-3'>
                                <span className='text-slate-400'>ISBN Number</span>
                                <span className='font-mono text-white'>{bookData.isbn}</span>
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 p-6 rounded-2xl bg-slate-900/50 border border-slate-800'>
                        <h2 className='text-sm uppercase tracking-widest text-blue-400 font-bold mb-4'>Seller Information</h2>
                        <div className='flex items-center gap-4'>
                            <img className='rounded-full h-12 w-12 border-2 border-blue-500/20' src={bookData.userPicURL} alt="" />
                            <div>
                                <p className='text-lg font-semibold text-white'>{bookData.displayName}</p>
                                <p className='text-sm text-slate-400'>{bookData.userEmail}</p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-10 flex flex-col sm:flex-row items-center gap-6'>
                        <div className='flex items-center gap-3'>
                            <span className='text-slate-300 font-medium'>Qty:</span>
                            <input
                                type="number"
                                value={qty}
                                min="1"
                                className='bg-slate-900 border border-slate-700 text-white w-20 rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500 outline-none transition'
                                onChange={(e) => setQty(Number(e.target.value))}
                            />
                        </div>

                        <button
                            className='w-full sm:flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95'
                            onClick={placeOrder}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BookDetails