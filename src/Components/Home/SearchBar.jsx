import React from 'react'
import { FaSearch } from "react-icons/fa";
import Button from '../Common/Button';
import SelectElement from '../Common/SelectElement';

const SearchBar = ({ searchValue, setSearchValue, handler, sortingHandler }) => {
    return (
        <div className='search-container'>
            <div className='search-input'>
                <input
                    type='text'
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value.toLowerCase()) }}
                    name='search'
                    placeholder='Search characters..' />
                <span
                    className='search-icon'
                    onClick={handler}>
                    <FaSearch color='#FFFFF' />
                </span>
            </div>
            <Button
                onClick={() => { handler("clear") }}
                disabled={searchValue.length < 3}>
                Clear search
            </Button>
            <SelectElement sortingHandler={sortingHandler} />
        </div>
    )
}

export default SearchBar