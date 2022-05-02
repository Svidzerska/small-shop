import React, {KeyboardEventHandler, useState} from "react";

import './searchInput.scss';

import {ReactComponent as GlassIcon} from '../../../../images/glassIcon.svg';

const SearchInput:React.FC = ():JSX.Element => {
   const [isInputValue, setIsInputValue] = useState<string>("");

   const setValues = (e: React.FormEvent<HTMLInputElement>):void => {
      setIsInputValue(e.currentTarget.value);
   }

   const searchStart = ():void => {
      console.log(isInputValue);
   }

   const searchStartEnter = (e: React.KeyboardEvent<HTMLInputElement>):void => {
      e.key === 'Enter' && console.log(isInputValue);
   }

   return (
      <div className="search-field">
         <input placeholder="Search"
            value={isInputValue}
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

export default SearchInput;