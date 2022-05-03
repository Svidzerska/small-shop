import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import './editCategories.scss';

import { ReactComponent as PensilIcon } from '../../../../images/pensilIcon.svg';
import { ReactComponent as TrashIcon } from '../../../../images/trashIcon.svg';

import {
   setTemporaryCategories,
   setEditingCategory,
   setChooseAllCategories
} from "../../../../features/categories/categoriesSlice";

import { Category } from '../../../../interfaces/Category';

import ConfirmButtons from '../buttonsComponents/confirmButtons/ConfirmButtons';
import EditButtons from '../buttonsComponents/editButtons/EditButtons';

const EditCategories: React.FC = (): JSX.Element => {
   const dispatch = useDispatch();
   
   const temporaryCategories: Category[] = useSelector((state: RootStateOrAny) => state.categories.categoriesTemporaryArray);
   const isAddingNewCategory: boolean = useSelector((state: RootStateOrAny) => state.categories.isAddingNewCategory);
   const isChooseAllCategories: boolean = useSelector((state: RootStateOrAny) => state.categories.isChooseAllCategories);
   const isEditingCategory: boolean = useSelector((state: RootStateOrAny) => state.categories.isEditingCategory);

   const [activeCategories, setActiveCategories] = useState<string[]>([temporaryCategories[0]?.name]);
   const [editedCategory, setEditedCategory] = useState<number>(0);
   const [value, setValue] = useState<string>("");
   const [charAmountLeft, setCharAmountLeft] = useState<number>(0);

   useEffect(() => {
      if (activeCategories.length === temporaryCategories.length) {
         dispatch(setChooseAllCategories(true));
      }
   }, [activeCategories.length]);

   useEffect(() => {
      if (isChooseAllCategories) {
         setActiveCategories([...temporaryCategories].map(item => item.name));
      } else if (!isChooseAllCategories && activeCategories.length === temporaryCategories.length) {
         setActiveCategories([]);
      }
   },[isChooseAllCategories]);

   const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      if (!isEditingCategory) { 
         const currentActiveCategories: string[] = [...activeCategories];
         const targetValue: string = e.currentTarget.value;

         const checkActiveCategory: boolean = currentActiveCategories.includes(e.currentTarget.value);

            if (checkActiveCategory) {
               setActiveCategories(() => {
                  const categoriesWithoutDeleteElement: string[] = currentActiveCategories.filter(item => item !== targetValue);
                  return categoriesWithoutDeleteElement;
               });
            } else {
               setActiveCategories(arr => [...arr, `${targetValue}`]);
            }
         dispatch(setChooseAllCategories(false));
      }
   }

   const editCategory = (e: React.MouseEvent<HTMLButtonElement>, id: number): void => {
      setEditedCategory(id);

      const existValue = temporaryCategories.find(item => item.id === id);

      if (existValue) {
         setCharAmountLeft(20-existValue.name.length);
         setValue(existValue.name);
      }

      dispatch(setEditingCategory(true));
   }

   const editCategoryInputField = (e: React.FormEvent<HTMLInputElement>): void => {
      if (e.currentTarget.value.length <= 20) {
         setValue(e.currentTarget.value);
         setCharAmountLeft(20-e.currentTarget.value.length);
      }
   }

   const deleteCategory = (e: React.MouseEvent<HTMLButtonElement>, id: number): void => {
      const currentCategories: Category[] = [...temporaryCategories];
      dispatch(setTemporaryCategories(currentCategories.filter((item) => item.id !== id)));
      
      const deleteCategory = currentCategories.find((item) => item.id === id);
      setActiveCategories(activeCategories.filter((item) => item !== deleteCategory?.name));
   }

   const doneCategory = (e: React.MouseEvent<HTMLButtonElement>, id: number): void => {
      const currentCategories: Category[] = [...temporaryCategories];
      const secondElementCategory = currentCategories.find((item) => item.name === value && item.id !== id);

      if (!secondElementCategory) {
         const currentCategory = currentCategories.findIndex((item) => item.id === id);
         const indexActiveCategory = activeCategories.findIndex((item) => item === currentCategories[currentCategory].name);
      
         currentCategories[currentCategory] = {...currentCategories[currentCategory], name: value};
         dispatch(setTemporaryCategories(currentCategories)); 

         setActiveCategories((arr) => {
            const updateArr = [...arr];
            updateArr.splice(indexActiveCategory,1,value);
            return updateArr;
         })
      } else {
         dispatch(setTemporaryCategories(currentCategories.filter((item) => item.id !== id)));
         const deleteCategory = currentCategories.find((item) => item.id === id);
         setActiveCategories(activeCategories.filter((item) => item !== deleteCategory?.name));
      }
      setEditedCategory(0);
      dispatch(setEditingCategory(false));
   }

   const cancelEditCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setEditedCategory(0);
      dispatch(setEditingCategory(false));
   }

   const renderButtons = (category: Category): JSX.Element => {
      return (
         editedCategory === category.id ?
            <ConfirmButtons category={category}
               check={doneCategory}
               cancel={cancelEditCategory} /> :
            <EditButtons category={category}
               edit={editCategory}
               deleteElement={deleteCategory}
               className={!(isAddingNewCategory || isEditingCategory) ? '' : "unactivated"}
               isDisabled={isAddingNewCategory || isEditingCategory} />
      )
   }

   const displayCategories: JSX.Element[] = temporaryCategories.map((category: Category) => {
      return (
         <li key={category.id}
            className={activeCategories.find(item => item === category.name) ? 'edit-component active' : 'edit-component'}>
            <div>
               <button
                  onClick={chooseCategory}
                  className={activeCategories.find(item => item === category.name) ? 'categories-name__button active' : 'categories-name__button'}
                  value={category.name}
                  disabled={isAddingNewCategory || isEditingCategory}
                  >
                  {editedCategory === category.id ?
                     <input value={isEditingCategory ? value : category.name}
                        onChange={editCategoryInputField}
                        className="inputForEdit"
                        autoFocus /> :
                     category.name}
               </button>
               {activeCategories.find(item => item === category.name) &&
                  isEditingCategory &&
                  editedCategory === category.id ?
                  <p className='edit-component__char-amount'>{charAmountLeft} char. left</p> :
                  null}
            </div>
            {activeCategories.find(item => item === category.name) &&
             renderButtons(category)}
         </li>
      )
   })

   return (
      <ul className="popup__edit-place">
         {displayCategories}
      </ul>
   )
}

export default EditCategories;