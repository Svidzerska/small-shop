import React, {useEffect, useState} from 'react';
import './edit.scss';

import pensil from '../../../images/square-pen-solid.svg';
import trash from '../../../images/trash-can-solid.svg';



import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import { getCategories } from "../../../features/products/categoriesSlice";

import { Categories } from '../../../interfaces/Categories';


const Edit : React.FC = () => {
   const dispatch = useDispatch();

   const categories:Array<Categories> = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);

   const [isActiveCategory, setIsActiveCategory] = useState<string>(categories[0].name); 


   useEffect(() => {
      dispatch(getCategories());
   }, []);


   const editCategory = (e: React.MouseEvent<HTMLButtonElement>):void => {
         setIsActiveCategory(e.currentTarget.value);
   }
   
 
   const displayCategories:JSX.Element[] = categories.map((category: Categories) => {
      return (
      <div key={category.id}
       className={isActiveCategory === category.name  ? 'edit-component active' : 'edit-component'}>
         {category.warning !== "" ? 
         <p>{category.warning}</p> : (
         <>
         <button onClick={editCategory}
            className={isActiveCategory === category.name  ? 'categories-name__button active' : 'categories-name__button'}
            value={category.name}>
            {category.name}
         </button>
         {isActiveCategory === category.name ? 
         <>
         <button>
            <img src={pensil} alt="" />
         </button>
         <button>
            <img src={trash} alt="" />
         </button>
         </> : <></>}
         </>)}
         </div>
      )
   })


   return (
      <div className="popup__edit-place">
         {displayCategories}
      </div>
   )
}

export default Edit;