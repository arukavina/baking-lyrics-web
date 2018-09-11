import React from 'react'
import './searchBar.css'

export default ({ handleSubmit }) => {
  return(
    <div className='searchBarContainer'>
      <form className="search" action="index.html" method="post">
        <input className="searchBox" type="text" autoFocus />
        <input className="searchButton" type="button" name="GENERATE" value="GENERATE" />
      </form>
    </div>
  );
}

export default SearchBar;
