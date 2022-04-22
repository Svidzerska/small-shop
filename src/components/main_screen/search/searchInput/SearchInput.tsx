import React from "react";
import './searchInput.scss';
import {ReactComponent as Glass} from '../../../../images/glassIcon.svg';


const SearchInput: React.FC = () => {
   return (
      <div className="search-field">
         <input className="" placeholder="Search" />
         <button className="search-element__button-glass">
            <i>
               <Glass/>
            </i>
         </button>
      </div>
   )
};

export default SearchInput;