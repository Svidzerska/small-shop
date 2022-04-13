import React, { useEffect } from "react";
import './menu.scss';
import list from '../../../images/list.svg';

import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getProducts } from "../../../features/products/productSlice";
import { getCategories } from "../../../features/products/categoriesSlice";


const Menu: React.FC = () => {

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getProducts());
   }, []);

   useEffect(() => {
      dispatch(getCategories());
   }, []);

   return (
      <header className="menu-element">
         <p className="">Shop</p>
         <button className=""
         onClick={getProducts}>
           <img src={list} alt="list"/>
         </button> 
      </header>
   )
};


export default Menu;