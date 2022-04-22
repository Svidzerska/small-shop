import React, { useEffect } from "react";
import './menu.scss';
import { ReactComponent as BurgerIcon } from "../../../images/burgerIcon.svg";

import { useDispatch } from "react-redux";
import { getProducts } from "../../../features/products/productSlice";
import { getCategories } from "../../../features/products/categoriesSlice";


const Menu: React.FC = ():JSX.Element => {

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getProducts());
   }, []);

   useEffect(() => {
      dispatch(getCategories());
   }, []);

   return (
      <header className="menu-element">
         <h1 className="">Shop</h1>
         <button className=""
            onClick={getProducts}>
            <i>
               <BurgerIcon/>
            </i>
         </button>
      </header>
   )
};


export default Menu;