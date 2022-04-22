import React, { useEffect } from "react";
import './search.scss';
import {ReactComponent as Sliders} from '../../../images/slidersIcon.svg';

import Popup from "../../popup/Popup";

import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { setPopup } from "../../../features/products/productSlice";
import SearchInput from "./searchInput/SearchInput";

const Search : React.FC = () => {

   const dispatch = useDispatch();
   const isPopup = useSelector((state : RootStateOrAny) => state.products.popup);


   const showPopup = () => {
      dispatch(setPopup(true));
   }

   useEffect(() => {
      if (isPopup) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'auto';
      }
   }, [isPopup]);



   return (
      <section className="search-element">
         <SearchInput/>
         <button className="search-element__button-sliders" onClick={showPopup}>
            <i>
               <Sliders/>
            </i>
         </button>
         {isPopup ? <Popup/> : null}
      </section>
   ) 
};


export default Search;