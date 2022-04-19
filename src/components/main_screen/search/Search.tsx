import React, { useEffect } from "react";
import './search.scss';
import sliders from '../../../images/sliders-solid.svg';
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


   return (
      <section className="search-element">
         <SearchInput/>
         <button className="search-element__button-sliders" onClick={showPopup}>
            <img src={sliders} alt=""/>
         </button>
         {isPopup ? <Popup/> : ""}
      </section>
   ) 
};


export default Search;