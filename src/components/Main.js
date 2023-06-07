import React from 'react';
import  { useState } from 'react';
import NavBar from './NavBar';

const Main = () => {
  const [searchTerm, setSearchTerm ] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearchTerm = () => {
    setSearchTerm('');
  };

  const handleSearchSubmit = () => {
    console.log('Search submitted:', searchTerm);
  };

  return (
    <>
    <NavBar />
      <div className="header">
        <div className="row1">
          <h1>A room without books is like <br></br>a body without a soul.</h1>
        </div>
        <div className="row2">
        
          <div className="search">
           
          
          </div>
          <img
            src="https://media.istockphoto.com/id/1140772541/vector/kids-reading-group-of-friends.jpg?s=612x612&w=0&k=20&c=rNtK_-skAB382XDhExCBasJ9wApCdlC_RVx4imMv5MM="
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Main;