import React, { useState } from "react";
import { useFireBaseContext } from "../context/FireBaseContext";

const List = () => {
  const [bookDetails, setBookDetails] = useState({
    name: "",
    isbn: "",
    price: "",
    coverPic: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: files ? files[0] : value,
    });
  };

  const fireBaseContext = useFireBaseContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fireBaseContext.handleCreateNewListing(bookDetails.name, bookDetails.isbn, bookDetails.price, bookDetails.coverPic);
      console.log(response)
    }
    catch (error) {
      console.error("Error in listing books:", error);
    }
    finally {
      setBookDetails({
        name: "",
        isbn: "",
        price: "",
        coverPic: ""
      })
    }

  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 py-12 px-4">
      <form className="flex flex-col border border-slate-800 bg-slate-900/50 backdrop-blur-md rounded-2xl w-full max-w-lg text-slate-200 p-8 shadow-2xl">
        <div className="mb-8">
          <h1 className="text-center text-3xl font-bold text-white tracking-tight">Add New Listing</h1>
          <p className="text-center text-slate-400 text-sm mt-2">Enter the book details to list it in the library</p>
        </div>

        <div className="space-y-5">

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-slate-300 ml-1">Book Title</label>
            <input
              className="border border-slate-700 rounded-xl py-2.5 px-4 bg-slate-950/50 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
              type="text"
              name="name"
              placeholder="e.g. The Great Gatsby"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="isbn" className="text-sm font-medium text-slate-300 ml-1">ISBN Number</label>
            <input
              className="border border-slate-700 rounded-xl py-2.5 px-4 bg-slate-950/50 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
              type="text"
              name="isbn"
              placeholder="978-3-16-148410-0"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="price" className="text-sm font-medium text-slate-300 ml-1">Price (₹)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
              <input
                className="w-full border border-slate-700 rounded-xl py-2.5 pl-8 pr-4 bg-slate-950/50 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
                type="number"
                name="price"
                placeholder="0.00"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="coverPic" className="text-sm font-medium text-slate-300 ml-1">Cover Image</label>
            <input
              className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 transition-all cursor-pointer border border-slate-700 rounded-xl bg-slate-950/50"
              required
              type="file"
              name="coverPic"
              onChange={handleChange}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20"
              onClick={handleSubmit}
            >
              Add Book to Collection
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default List;
