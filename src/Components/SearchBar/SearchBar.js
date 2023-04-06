import { useState } from 'react';
import './SearchBar.css'

export default function SearchBar({ search, errorMessage }) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchInput !== '') {
      search(searchInput);
      setSearchInput('');
    }
  };

  return (
    <div className='search_container'>
      <h1>Cerca un pokemon</h1>
      <input
        type="search"
        placeholder="e.g. bulbasaur"
        value={searchInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {errorMessage && <p>{errorMessage}</p>}
      <button className="button" onClick={handleSearch}>
        Cerca
      </button>
    </div>
  );
}
