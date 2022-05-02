import React, { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import './search.scss';

import {ReactComponent as SlidersIcon} from '../../../images/slidersIcon.svg';

import { setPopup } from "../../../features/products/productSlice";

import SearchInput from "./searchInput/SearchInput";
import Popup from "../../popup/Popup";

const Search:React.FC = ():JSX.Element => {
   const dispatch = useDispatch();
   const isPopup = useSelector((state : RootStateOrAny) => state.products.popup);

   const showPopup = () => {
      dispatch(setPopup(true));
   }

   useEffect(() => {
      document.body.style.overflow = isPopup ? 'hidden' : 'auto';
   }, [isPopup]);

   return (
      <section className="search-element">
         <SearchInput/>
         <button className="search-element__button-sliders" onClick={showPopup}>
            <i>
               <SlidersIcon/>
            </i>
         </button>
         {isPopup && <Popup/>}
      </section>
   ) 
};

export default Search;