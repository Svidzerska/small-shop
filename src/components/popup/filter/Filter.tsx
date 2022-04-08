import './filter.scss';
import arrowRight from '../../../images/arrow-left-solid.svg';
import pensil from '../../../images/square-pen-solid.svg';
import info from '../../../images/info-solid.svg';

import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import { setPopup } from '../../../features/products/productSlice';

import { getCategories } from "../../../features/products/categoriesSlice";

function Filter() {
   const dispatch = useDispatch();

   const categories:Array<string> = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);


   useEffect(() => {
      dispatch(getCategories());
   }, []);

   useEffect(() => {
      console.log(categories);
   }, [categories]);

   const closePopup = () => {
      dispatch(setPopup(false));
   }

   const displayCategories:JSX.Element[] = categories.map((category: string) => {
      return (
         <button key={category} className='categories-name__button'>{category}</button>
      )
   })

   return (
      <div className="popup">
         <div className='popup__name'>
            <button onClick={closePopup}><img src={arrowRight} alt="" /></button>
            <p>Filter</p>
         </div>
         <div className='popup__categories-change'>
            <p>Categories</p>
            <button><img src={pensil} alt="" /></button>
            <p className='categories-change__info'><img src={info} alt="" /></p>
         </div>
         <div className='popup__categories-name'>
            <button className='categories-name__button'>All</button>
            {displayCategories}
         </div>
      </div>
   )
}

export default Filter;