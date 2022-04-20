import React, { useEffect, useState } from 'react';
import './popupEditCategories.scss';

import pensil from '../../../images/square-pen-solid.svg';
import trash from '../../../images/trash-can-solid.svg';
import check from '../../../images/square-check-solid.svg';
import xmark from '../../../images/square-xmark-solid.svg';




import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setTemporaryCategories, setEditingCategory } from "../../../features/products/categoriesSlice";

import { Categories } from '../../../interfaces/Categories';


const PopupEditCategories: React.FC = ():JSX.Element => {
   const dispatch = useDispatch();

   const temporaryCategories: Array<Categories> = useSelector((state: RootStateOrAny) => state.categories.categoriesTemporaryArray);
   const isAddNewCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.toAddNewCategory);


   const [isActiveCategories, setIsActiveCategories] = useState<Array<string>>([temporaryCategories[0]?.name]);  
   const [isEditCategory, setIsEditCategory] = useState<string>("");
   const [isInputValue, setIsInputValue] = useState<string>("");

   useEffect(() => {
      console.log(isActiveCategories);
   }, [isActiveCategories]);


   const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>):void => {
      console.log(isEditCategory);
      console.log(e.currentTarget.id);


      if (isEditCategory !== e.currentTarget.id) {
         const currentActiveCategories:string[] = [...isActiveCategories];
         const targetValue:string = e.currentTarget.value;
         console.log(e.currentTarget.value);

         const checkActiveCategory = currentActiveCategories.includes(e.currentTarget.value);

            if (checkActiveCategory) {
               setIsActiveCategories(() => {
                  const categoriesWithoutDeleteElement:string[] = currentActiveCategories.filter(item => item !== targetValue);
                  return categoriesWithoutDeleteElement;
               });
            } else {
               setIsActiveCategories(arr => [...arr, `${targetValue}`]);
            }

      dispatch(setEditingCategory(false));
      }
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
      const currentCategories = [...temporaryCategories];
      dispatch(setTemporaryCategories(currentCategories.filter((item) => item.id !== e.currentTarget.id)));
      
      const deleteCategory = currentCategories.find((item) => item.id === e.currentTarget.id);
      setIsActiveCategories(isActiveCategories.filter((item) => item !== deleteCategory?.name));
   }

   const doneInputCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      const categoriesInput = [...temporaryCategories];
      const currentCategory = categoriesInput.findIndex((item) => item.id === e.currentTarget.id);
      const indexActiveCategory = isActiveCategories.findIndex((item) => item === categoriesInput[currentCategory].name);
      
      categoriesInput[currentCategory] = {...categoriesInput[currentCategory], name: isInputValue};
      dispatch(setTemporaryCategories(categoriesInput)); 
      
      setIsEditCategory("");
      dispatch(setEditingCategory(false));

      setIsActiveCategories((arr) => {
         const updateArr = [...arr];
         updateArr.splice(indexActiveCategory,1,isInputValue);
         return updateArr;
      })
   }

   const cancelEditCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setIsEditCategory("");
      dispatch(setEditingCategory(false));
   }

   const renderEditButtons = (category:Categories):JSX.Element => {
      return (
         <>
            <button onClick={editCurrentCategory} id={category.id} disabled={isAddNewCategory}>
               <img className={!isAddNewCategory ? '' : "unactivated"} src={pensil} alt="" />
            </button>
            <button onClick={deleteCategory} id={category.id} disabled={isAddNewCategory}>
               <img className={!isAddNewCategory ? '' : "unactivated"} src={trash} alt="" />
            </button>
         </>
      )
   }

   const renderDoneButtons = (category:Categories):JSX.Element => {
      return (
         <>
            <button onClick={doneInputCategory} id={category.id}>
               <img src={check} alt="" />
            </button>
            <button onClick={cancelEditCategory} id={category.id} >
               <img src={xmark} alt="" />
            </button>
         </>
      )
   }


   const displayCategories: JSX.Element[] = temporaryCategories.map((category: Categories) => {
      return (
         <div key={category.id}
            className={isActiveCategories.find(item => item === category.name) ? 'edit-component active' : 'edit-component'}>
               <>
                  <button onClick={chooseCategory}
                     className={isActiveCategories.find(item => item === category.name) ? 'categories-name__button active' : 'categories-name__button'}
                     value={category.name}
                     disabled={isAddNewCategory}
                     id={category.id}>
                     {isEditCategory === category.id ?
                        <input id={category.id} defaultValue={category.name} onChange={editInputCategory} className="inputForEdit" autoFocus/> :
                        category.name}
                  </button>
                  {isActiveCategories.find(item => item === category.name) ? 
                  (isEditCategory !== "" && isEditCategory === category.id ? 
                     renderDoneButtons(category) : 
                     renderEditButtons(category)) : 
                      null}
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

export default PopupEditCategories;