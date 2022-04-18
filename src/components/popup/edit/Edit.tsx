import React, { useEffect, useState } from 'react';
import './edit.scss';

import pensil from '../../../images/square-pen-solid.svg';
import trash from '../../../images/trash-can-solid.svg';
import check from '../../../images/square-check-solid.svg';
import xmark from '../../../images/square-xmark-solid.svg';




import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setCategories, setEditingCategory } from "../../../features/products/categoriesSlice";

import { Categories } from '../../../interfaces/Categories';



const Edit: React.FC = () => {
   const dispatch = useDispatch();

   const categories: Array<Categories> = useSelector((state: RootStateOrAny) => state.categories.categoriesArray);
   const addingCategoryFromStore:boolean = useSelector((state: RootStateOrAny) => state.categories.addingCategory);


   const [isActiveCategory, setIsActiveCategory] = useState<string>(categories[0]?.name);
   const [isEditCategory, setIsEditCategory] = useState<string>("");

   const [isInputValue, setIsInputValue] = useState<string>("");


   useEffect(() => {
      setIsActiveCategory(categories[0]?.name);
   }, [categories.length, categories]);


   const editCategories = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setIsActiveCategory(e.currentTarget.value);
      dispatch(setEditingCategory(false));
   }

   const editCurrentCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setIsEditCategory(e.currentTarget.id);
      setIsInputValue(e.currentTarget.id);
      dispatch(setEditingCategory(true));
   }

   const editInputCategory = (e: any): void => {
      setIsInputValue(e.currentTarget.value);
   }

   const deleteCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      const currentCategories = [...categories];
      dispatch(setCategories(currentCategories.filter((item) => item.id !== e.currentTarget.id)));
   }

   const doneInputCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      const categoriesInput = [...categories];
      const currentCategory = categoriesInput.findIndex((item) => item.name === e.currentTarget.id);
      categoriesInput[currentCategory] = {...categoriesInput[currentCategory], name: isInputValue};
      dispatch(setCategories(categoriesInput)); 
      setIsEditCategory("");
      dispatch(setEditingCategory(false));
   }

   const cancelEditCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setIsEditCategory("");
      dispatch(setEditingCategory(false));
   }

   const renderEditButtons = (category:Categories):JSX.Element => {
      return (
         <>
            <button onClick={editCurrentCategory} id={category.name} disabled={!addingCategoryFromStore ? false : true}>
               <img className={!addingCategoryFromStore ? '' : "unactivated"} src={pensil} alt="" />
            </button>
            <button onClick={deleteCategory} id={category.id} disabled={!addingCategoryFromStore ? false : true}>
               <img className={!addingCategoryFromStore ? '' : "unactivated"} src={trash} alt="" />
            </button>
         </>
      )
   }

   const renderDoneButtons = (category:Categories):JSX.Element => {
      return (
         <>
            <button onClick={doneInputCategory} id={category.name}>
               <img src={check} alt="" />
            </button>
            <button onClick={cancelEditCategory} id={category.id} >
               <img src={xmark} alt="" />
            </button>
         </>
      )
   }


   const displayCategories: JSX.Element[] = categories.map((category: Categories) => {
      return (
         <div key={category.id}
            className={isActiveCategory === category.name ? 'edit-component active' : 'edit-component'}>
               <>
                  <button onClick={editCategories}
                     className={isActiveCategory === category.name ? 'categories-name__button active' : 'categories-name__button'}
                     value={category.name}
                     disabled={!addingCategoryFromStore ? false : true}>
                     {isActiveCategory === isEditCategory && isActiveCategory === category.name ?
                        <input id={category.id} defaultValue={category.name} onChange={editInputCategory} className="inputForEdit" autoFocus/> :
                        category.name}
                  </button>
                  {isActiveCategory === category.name ? 
                  isEditCategory !== "" && isEditCategory === category.name ? 
                     renderDoneButtons(category) : 
                     renderEditButtons(category) : 
                      <></>}
               </>
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