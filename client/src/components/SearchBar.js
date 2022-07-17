import React from 'react';

const SearchBar  = () => {


    return (
        <div className='search'>
            <div className='searchInputs'>
                <input type="text"/>
                <div className='searchIcon'></div>
            </div>
            <div className='searchResults'></div>
        </div>
    )
}