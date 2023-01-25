import React, { FC } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import './Search.scss';

const Search: FC = () => {
  return (
    <div className='header-search'>
      <div className='header-search__input-container'>
        <AiOutlineSearch className='header-search__input-icon' />
        <input type='text' className='header-search__input-input' placeholder='Пошук продукції...' />
      </div>
    </div>
  );
};

export default Search;
