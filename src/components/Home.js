import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './Home.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    author: '',
    amount: '',
    genre: '',
  });
  const [searchResults, setSearchResults] = useState([]);

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
      const response = await fetch('http://localhost:9292/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      const createdBook = await response.json();
      setData([...data, createdBook]);
      setNewBook({
        title: '',
        description: '',
        author: '',
        amount: '',
        genre: '',
      });
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await fetch(`http://localhost:9292/${bookId}`, {
        method: 'DELETE',
      });
      setData(data.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const openModal = (book) => {
    setSelectedItem(book);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target.elements.search.value;

    // Perform search logic here
    const filteredData = data.filter((item) => {
      // Assuming you want to search by book title
      return item.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    setSearchResults(filteredData);
  };

  const updateBook = async () => {
    try {
      const response = await fetch(`http://localhost:9292/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedItem),
      });
      if (response.ok) {
        const updatedBook = await response.json();
        setData(data.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
        closeModal();
      } else {
        console.error('Error updating book:', response.status);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  return (
    <div className="Home">
      <h1>The Novels</h1>

      <div className='row2'>
        <h2>Find Your Book</h2>
        <div className='search'>
          <form onSubmit={handleSearch}>
            <input type="text" name="search" placeholder="Enter Book Name" />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      <ul>
        {searchResults.length > 0
          ? searchResults.map((item) => (
              <li key={item.id}>
                <button onClick={() => openModal(item)}>
                  <img src={item.poster} alt="Book cover" />
                </button>
                <button onClick={() => deleteBook(item.id)}>Delete</button>
              </li>
            ))
          : data.map((item) => (
              <li key={item.id}>
                <button onClick={() => openModal(item)}>
                  <img src={item.poster} alt="Book cover" />
                </button>
                <button onClick={() => deleteBook(item.id)}>Delete</button>
              </li>
            ))}
      </ul>

      <h2>Create a New Book</h2>
      <form>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
        />
        <br />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={newBook.description}
          onChange={handleInputChange}
        />
        <br />

        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
        />
        <br />

        <label>Poster:</label>
        <input
          type="text"
          name="poster"
          value={newBook.poster}
          onChange={handleInputChange}
        />
        <br />

        <label>Amount:</label>
        <input
          type="text"
          name="amount"
          value={newBook.amount}
          onChange={handleInputChange}
        />
        <br />

        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={newBook.genre}
          onChange={handleInputChange}
        />
        <br />

        <button type="button" onClick={createBook}>
          Create
        </button>
      </form>

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