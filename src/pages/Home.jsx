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
        querySnapShot.forEach((doc) => {
          setBooks([{ id: doc.id, ...doc.data() }]);
        });
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [])

  return (
    <>
      <div>
        <h1>List All Books</h1>
        {
          books.map((book) => {
            return (
              <Card key={book.id} book={book} />
            )
          })
        }

      </div>
    </>
  );
};

export default Home;
