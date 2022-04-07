import './filter.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import { setPopup } from '../../../features/products/productSlice';

import { getCategories } from "../../../features/products/categoriesSlice";

function Filter() {
   const dispatch = useDispatch();

   const categories = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);


   useEffect(() => {
      dispatch(getCategories());
   }, []);

   useEffect(() => {
      console.log(categories);
   }, [categories]);

   const closePopup = () => {
      dispatch(setPopup(false));
   }

   return (
      <div className="popup">
         <button onClick={closePopup}>close</button>
         <p>Filter</p>
      </div>
   )
}

export default Filter;