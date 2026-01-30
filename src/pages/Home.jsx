import React, { useEffect, useState } from "react";
import { useFireBaseContext } from "../context/FireBaseContext"
import Card from "../components/Card";
import { query } from "firebase/database";

const Home = () => {
  const [books, setBooks] = useState([]);
  const firebase = useFireBaseContext();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapShot = await firebase.listAllBooks();
        setBooks(
          querySnapShot.docs.map(doc => ({
            id: doc.id, ...doc.data()
          }))
        )
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [])

  return (
    <>
      <div className="mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          List All Books
        </h1 >

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => {
            return (
              <Card key={book.id} book={book} link={`/book/view/${book.id}`} />
            )
          }
          )}
        </div>
      </div >
    </>
  );
};

export default Home;
