import React, {useEffect, useState} from 'react';
import './edit.scss';

import pensil from '../../../images/square-pen-solid.svg';
import trash from '../../../images/trash-can-solid.svg';



import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';

import { getCategories } from "../../../features/products/categoriesSlice";



function Edit() {
   const dispatch = useDispatch();

   const categories:Array<string> = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);

   const [isActiveCategory, setIsActiveCategory] = useState<string>(categories[0]); 


   useEffect(() => {
      dispatch(getCategories());
   }, []);


   const editCategory = (e: React.MouseEvent<HTMLButtonElement>):void => {
         setIsActiveCategory(e.currentTarget.value);
   }
   
 
   const displayCategories:JSX.Element[] = categories.map((category: string) => {
      return (<>
         <button key={category}
            onClick={editCategory}
            className={isActiveCategory === category  ? 'categories-name__button active' : 'categories-name__button'}
            value={category}>
            {category}
         </button>
         {isActiveCategory === category ? 
         <>
         <button>
            <img src={pensil} alt="" />
         </button>
         <button>
            <img src={trash} alt="" />
         </button>
         </> : <></>}
         </>
      )
   })


   return (
      <div className="popup__edit-place">
         {displayCategories}
      </div>
   )
}

export default Edit;