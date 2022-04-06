import React, { useEffect } from "react";
import './menu.scss';
// import Api from "../api/getProducts";
import list from '../images/list.svg';

import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getProducts } from "../features/products/productSlice";


function Menu(): JSX.Element {

   const dispatch = useDispatch();

   const cards = useSelector((state : RootStateOrAny) => state.products.cardArray);


   // const getProducts = () => {
   //    // const a = Api.getProducts().then(data => console.log(data));
   //    // console.log(a);
   // }

   useEffect(() => {
      dispatch(getProducts());
   }, []);

   useEffect(() => {
      console.log(cards);
   }, [cards]);

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