import React, { useState } from "react";

import './search.scss';

import {ReactComponent as GlassIcon} from '../../../images/glassIcon.svg';

const Search:React.FC = ():JSX.Element => {
   const [value, setValue] = useState<string>("");

   const setValues = (e: React.FormEvent<HTMLInputElement>):void => {
      setValue(e.currentTarget.value);
   }

   const searchDone = (value:string):void => {
      console.log(value);
   }

   const searchStart = (e: React.MouseEvent<HTMLButtonElement>):void => {
      searchDone(value);
   }

   const searchStartEnter = (e: React.KeyboardEvent<HTMLInputElement>):void => {
      e.key === 'Enter' && searchDone(value);
   }

   return (
      <div className="search-field">
         <input placeholder="Search"
            value={value}
            onChange={setValues}
            onKeyDown={searchStartEnter} />
         <button className="search-element__button-glass" onClick={searchStart}>
            <i>
               <GlassIcon/>
            </i>
         </button>
      </div>
   )
};

export default Search;