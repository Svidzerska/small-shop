import React, { useEffect, useState } from "react";
import './searchInput.scss';
import glass from '../../../../images/magnifying-glass-solid.svg';


const SearchInput: React.FC = () => {
   return (<>
         <input className="" placeholder="Search"/>
         <button className="search-element__button-glass">
            <img src={glass} alt=""/>
         </button>
      </>
   )
};

export default SearchInput;