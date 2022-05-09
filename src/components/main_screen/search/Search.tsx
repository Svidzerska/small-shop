import React, { useState } from "react";

import './search.scss';

import {ReactComponent as GlassIcon} from '../../../images/glassIcon.svg';

const Search: React.FC = (): JSX.Element => {
   const [value, setValue] = useState<string>("");

   const changeValue = (e: React.FormEvent<HTMLInputElement>): void => {
      setValue(e.currentTarget.value);
   }

   const searchDone = (value: string): void => {
      console.log(value);
   }

   return (
      <div className="search-field">
         <input placeholder="Search"
            value={value}
            onChange={changeValue}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void | false =>
                         e.key === 'Enter' && searchDone(value)} />
         <button className="search-field__button-glass" onClick={(): void => searchDone(value)}>
            <i>
               <GlassIcon/>
            </i>
         </button>
      </div>
   )
};

export default Search;