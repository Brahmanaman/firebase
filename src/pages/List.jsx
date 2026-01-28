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
            <label htmlFor="coverPic">Cover Pic</label>
            <input
              className="border rounded-sm py-1 px-2 bg-transparent m-2 ml-0 outline-none"
              required
              type="file"
              name="coverPic"
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
