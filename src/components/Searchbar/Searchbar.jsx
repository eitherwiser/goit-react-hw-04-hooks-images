//in form the example of using onKeyDown event, to deny reload page by submiting
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa'
import { ReactComponent as Logo } from '../../icons/logo.svg'


export default function Searchbar ({onSearch}) {

  const [query, setQuery] = useState('')

  const onChange= (e) => setQuery(e.target.value)

  const onSubmit = (e) => {
    if(query.trim() === '') {
      toast.error('Type your query!');
      setQuery('')
      e.preventDefault();
      return
    };
    e.preventDefault();
    onSearch(query.toLowerCase());
    setQuery('')
  }


  return (
    <header className="Searchbar">
      <a href="https://pixabay.com/">
        <Logo className="logo" />
      </a>
      <form
        className="SearchForm"
        onKeyDown={
          (e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); 
              onSubmit(e);
            }
          }}
      >
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
          value={query}
        />
        <button onClick={onSubmit} className="SearchForm-button" type="button">
          <FaSearch />
        </button>
      </form>
    </header>
  )
}