import React, { useEffect } from "react";
import './menu.scss';
// import Api from "../api/getProducts";
import list from '../../../images/list.svg';

import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getProducts } from "../../../features/products/productSlice";


function Menu(): JSX.Element {

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getProducts());
   }, []);


   return (
      <div className="menu-element">
         <p className="">Shop</p>
         <button className=""
         onClick={getProducts}>
           <img src={list} alt="list"/>
         </button> 
      </div>
   )
};


export default Menu;