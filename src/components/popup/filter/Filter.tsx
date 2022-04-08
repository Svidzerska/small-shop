import './filter.scss';
import arrowRight from '../../../images/arrow-left-solid.svg';
import pensil from '../../../images/square-pen-solid.svg';
import info from '../../../images/info-solid.svg';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import { setPopup } from '../../../features/products/productSlice';

import { getCategories } from "../../../features/products/categoriesSlice";

function Filter() {
   const dispatch = useDispatch();

   const categories:Array<string> = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);

   const [isActiveCategory, setIsActiveCategory] = useState(""); 

   useEffect(() => {
      dispatch(getCategories());
   }, []);

   useEffect(() => {
      console.log(categories);
   }, [categories]);

   const closePopup = () => {
      dispatch(setPopup(false));
   }

   const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>):void => {
      if (isActiveCategory === e.currentTarget.value) {
         setIsActiveCategory(""); 
      } else {
         setIsActiveCategory(e.currentTarget.value);
      }
   }

   const chooseAll = ():void => {
      setIsActiveCategory("");
   }

   const displayCategories:JSX.Element[] = categories.map((category: string) => {
      return (
         <button key={category}
            onClick={chooseCategory}
            className={isActiveCategory === category ? 'categories-name__button active' : 'categories-name__button'}
            value={category}>
            {category}
         </button>
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
            <button onClick={chooseAll} className={isActiveCategory === "" ? 'categories-name__button active' : 'categories-name__button'}>All</button>
            {displayCategories}
         </div>
      </div>
   )
}

export default Filter;