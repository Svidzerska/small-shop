import './filter.scss';
import arrowRight from '../../../images/arrow-left-solid.svg';

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
         <div className='popup__name'>
            <button onClick={closePopup}><img src={arrowRight} alt="" /></button>
            <p>Filter</p>
         </div>
      </div>
   )
}

export default Filter;