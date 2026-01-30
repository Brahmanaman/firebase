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
      <div className="min-h-screen bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight">
              Explore <span className="text-blue-500">Library</span>
            </h1>
            <p className="text-slate-400 text-center mt-3 text-lg">
              Discover your next great read from our collection.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div key={book.id} className="transform transition-all duration-300 hover:-translate-y-2">
                <Card
                  book={book}
                  link={`/book/view/${book.id}`}
                />
              </div>
            ))}
          </div>

          {books.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-xl italic">No books found in the archives...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
