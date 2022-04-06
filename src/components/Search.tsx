import React, { useEffect, useState } from "react";
import './search.scss';
import sliders from '../images/sliders-solid.svg';
import glass from '../images/magnifying-glass-solid.svg';
import Filter from "./Popup/Filter";

import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { setPopup } from "../features/products/productSlice";

function Search(): JSX.Element {

   const dispatch = useDispatch();

   const isPopup = useSelector((state : RootStateOrAny) => state.products.popup);

   // const [isPopup, setIsPopup] = useState(false); //dispatch store

   const showPopup = () => {
      dispatch(setPopup(true));
   }

   useEffect (() => {
      console.log(isPopup);
   }, [isPopup]);

   return (
      <div className="search-element">
         <input className="" placeholder="Search"/>
         <button className="search-element__button-glass"><img src={glass} alt=""/></button>
         <button className="search-element__button-sliders" onClick={showPopup}><img src={sliders} alt=""/></button>
         {isPopup ? <Filter/> : ""}
      </div>
   )
};


export default Search;