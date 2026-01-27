import React, { useState } from "react";
import { useFireBaseContext } from "../context/FireBaseContext";

const List = () => {
  const [bookDetails, setBookDetails] = useState({
    name: "",
    isbnNumber: "",
    price: "",
    converPic: ""
  });

  const handleChange = (e) => {
    setBookDetails({
      ...bookDetails,
      [e.target.name]: e.target.value,
    });
  };

  const fireBaseContext = useFireBaseContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fireBaseContext.handleCreateNewListing(bookDetails.name, bookDetails.isbnNumber, bookDetails.price, bookDetails.converPic);
    setBookDetails({
      name: "",
      isbnNumber: "",
      price: "",
      converPic: ""
    })
  }

  return (
    <div className="w-full flex justify-center pt-5">
      <form className="flex flex-col w-95 text-white p-3">
        <h1 className="text-center text-2xl">Add Book</h1>
        <div className="justify-center mt-5">
          <div className="flex flex-col ">
            <label htmlFor="name">Name</label>
            <input
              className="border rounded-sm py-1 px-2 bg-transparent m-2 ml-0 outline-0"
              required
              type="text"
              name="name"
              placeholder="enter book name"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="isbn">ISBN</label>
            <input
              className="border rounded-sm py-1 px-2 bg-transparent m-2 ml-0 outline-none"
              required
              type="text"
              name="isbn"
              placeholder="enter ISBN Number"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="price">Price</label>
            <input
              className="border rounded-sm py-1 px-2 bg-transparent m-2 ml-0 outline-none"
              required
              type="text"
              name="price"
              placeholder="enter book price"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="cover-pic">Cover Pic</label>
            <input
              className="border rounded-sm py-1 px-2 bg-transparent m-2 ml-0 outline-none"
              required
              type="file"
              name="cover-pic"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center gap-2 mt-5">
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-950 transition-colors py-2 px-4 w-auto rounded-md cursor-pointer active:scale-95"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default List;
