import React, {useEffect, useState} from 'react';
import './edit.scss';


import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';

import { getCategories } from "../../../features/products/categoriesSlice";



function Edit() {
   const dispatch = useDispatch();

   const categories:Array<string> = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);

   const [isActiveCategory, setIsActiveCategory] = useState<Array<string>>([]); 


   useEffect(() => {
      dispatch(getCategories());
   }, []);

   useEffect(() => {
      if (isActiveCategory.length === categories.length) {
         setIsActiveCategory([]);
      }
   }, [isActiveCategory]);


   const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>):void => {
      const currentActiveCategory:string[] = [...isActiveCategory];
      const currentIndex:number = currentActiveCategory.findIndex((item => item === e.currentTarget.value));

      if (currentIndex !== -1) {
         setIsActiveCategory((arr) => {
            const elementDeleteCategory:string[] = [...arr]
            elementDeleteCategory.splice(currentIndex,1,);
            return elementDeleteCategory;
         }); 
      } else {
         const currentTargetValue:string = e.currentTarget.value;
         setIsActiveCategory(arr => [...arr, `${currentTargetValue}`]);
      }
   }



   const editCategory = ():void => {
      
   }
   
 
   const displayCategories:JSX.Element[] = categories.map((category: string) => {
      return (
         <button key={category}
            onClick={editCategory} //choose category
            className={isActiveCategory.find(item => item === category)  ? 'categories-name__button active' : 'categories-name__button'}
            value={category}>
            {category}
         </button>
      )
   })


   return (
      <div className="popup__edit-place">
         {displayCategories}
      </div>
   )
}

export default Edit;