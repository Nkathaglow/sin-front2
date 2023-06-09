import React, { useState } from 'react';
import './Add.css';

const Add = () => {
  const [data, setData] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    author: '',
    amount: '',
    genre: '',
    poster: '',
  });

  const closeModal = () => {

  };

  const createBook = async () => {
    try {
      const response = await fetch('http://localhost:9292/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error('Error creating book');
      }

      const createdBook = await response.json();

      setData((prevData) => [...prevData, createdBook]);

      setNewBook({
        title: '',
        description: '',
        author: '',
        amount: '',
        genre: '',
        poster: '',
      });

      closeModal();
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <div>
      <button onClick={createBook}>Create Book</button>
    </div>
  );
};

export default Add;
