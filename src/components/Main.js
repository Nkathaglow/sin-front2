import React from 'react';
import  { useState } from 'react';



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
    
      <div className="header">
        <div className="row1">
          <h1>A room without books is like <br></br>a body without a soul.</h1>
        </div>
        <div className="row2">
        
          <div className="search">
           
          
          </div>
          <img
            src="https://c4.wallpaperflare.com/wallpaper/479/101/113/germany-saxony-gorlitz-hall-historical-literature-wallpaper-preview.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Main;