import React, { useEffect, useState } from 'react';
import './edit.scss';

import pensil from '../../../images/square-pen-solid.svg';
import trash from '../../../images/trash-can-solid.svg';



import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setCategories } from "../../../features/products/categoriesSlice";

import { Categories } from '../../../interfaces/Categories';



const Edit: React.FC = () => {
   const dispatch = useDispatch();

   const categories: Array<Categories> = useSelector((state: RootStateOrAny) => state.categories.categoriesArray);

   const [isActiveCategory, setIsActiveCategory] = useState<string>(categories[0]?.name);
   const [isEditCategory, setIsEditCategory] = useState<string>("");




   useEffect(() => {
      setIsActiveCategory(categories[0]?.name);
   }, [categories.length]);

   useEffect(() => {
      console.log(categories);
   }, [categories]);


   const editCategories = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setIsActiveCategory(e.currentTarget.value);
   }

   const editCurrentCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setIsEditCategory(e.currentTarget.id);
   }

   const editInputCategory = (e: any): void => {
      console.log(e.currentTarget.id);
      console.log(e.currentTarget.value); 

      const categoriesInput = [...categories];
      const currentCategory = categoriesInput.findIndex((item) => item.id === e.currentTarget.id);
      categoriesInput[currentCategory] = {...categoriesInput[currentCategory], name: e.currentTarget.value}
      // dispatch(setCategories(categoriesInput)); // це на кнопці прийняти, тому треба useState
   }

   const deleteCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      console.log(e.currentTarget.id);
      const currentCategories = [...categories];
      dispatch(setCategories(currentCategories.filter((item) => item.id !== e.currentTarget.id)));
   }


   const displayCategories: JSX.Element[] = categories.map((category: Categories) => {
      return (
         <div key={category.id}
            className={isActiveCategory === category.name ? 'edit-component active' : 'edit-component'}>
            {category.warning !== "" ?
               <p className='category-warning'>{category.warning}</p> :
               <>
                  <button onClick={editCategories}
                     className={isActiveCategory === category.name ? 'categories-name__button active' : 'categories-name__button'}
                     value={category.name}>
                     {isActiveCategory === isEditCategory && isActiveCategory === category.name ?
                        <input id={category.id} defaultValue={category.name} onChange={editInputCategory} className="inputForEdit" autoFocus/> :
                        category.name}
                  </button>
                  {isActiveCategory === category.name ?
                     <>
                        <button onClick={editCurrentCategory} id={category.name}>
                           <img src={pensil} alt="" />
                        </button>
                        <button onClick={deleteCategory} id={category.id}>
                           <img src={trash} alt="" />
                        </button>
                     </> : <></>}
               </>}
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