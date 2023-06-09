import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import NavBar from './NavBar';
import './Home.css';
import Main from './Main';
import Add from './Add';

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    author: '',
    amount: '',
    genre: '',
    poster: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9292/');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
      const createdBook = await response.json();
      setData(prevData => [...prevData, createdBook]);
      setNewBook({
        title: '',
        description: '',
        author: '',
        amount: '',
        genre: '',
        image_url: ''
      });
      closeModal();
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };
  

  const updateBook = async (event) => {
    event.preventDefault(); 
  
    try {
      
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };
  
  const handleEditInputChange = (event) => {
    event.preventDefault();
  
    const { name, value } = event.target;
    setSelectedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  

  const deleteBook = async (bookId) => {
    try {
      await fetch(`http://localhost:9292/books/${bookId}`, {
        method: 'DELETE',
      });
      setData(data.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const openModal = (book) => {
    setSelectedItem(book);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsEditMode(false);
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

 
  return (
    <div className="Home">
      
      <NavBar />
      <Main />
      <Add />
      <h1>The Novels</h1>

      <div className="search">
 
      </div>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <button onClick={() => openModal(item)}>
              <img src={item.poster} alt="Book cover" />
            </button>
            <button onClick={() => deleteBook(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

  
      {selectedItem && (
        <Modal
        isOpen={true}
        onRequestClose={closeModal}
        contentLabel="Book Details"
      >
        <h2>Title: {selectedItem.title}</h2>
        <p>Description: {selectedItem.description}</p>
        <p>Author: {selectedItem.author}</p>
        <p>Amount: {selectedItem.amount}</p>
        <p>Genre: {selectedItem.genre}</p>
        

        <h2>Edit Book</h2>
        <form>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={selectedItem.title}
            onChange={handleEditInputChange}
          />
          <br />

          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={selectedItem.description}
            onChange={handleEditInputChange}
          />
          <br />

          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={selectedItem.author}
            onChange={handleEditInputChange}
          />
          <br />

          <label>Poster:</label>
          <input
            type="text"
            name="poster"
            value={selectedItem.poster}
            onChange={handleEditInputChange}
          />
          <br />

          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            value={selectedItem.amount}
            onChange={handleEditInputChange}
          />
          <br />

          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={selectedItem.genre}
            onChange={handleEditInputChange}
          />
          <br />
          <button onClick={updateBook}>Update</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
        
      )}
    </div>
  );
};

export default Home;