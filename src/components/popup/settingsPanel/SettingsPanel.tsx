import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import './settingsPanel.scss';

import { ReactComponent as PensilIcon } from '../../../images/pensilIcon.svg';
import { ReactComponent as InfoIcon } from '../../../images/infoIcon.svg';
import { ReactComponent as PlusIcon } from '../../../images/plusIcon.svg';
import { ReactComponent as CheckIcon } from '../../../images/checkIcon.svg';

import {
   setEditMode,
   setAddingNewCategory,
   setCategories,
   setTemporaryCategories,
   setChooseAllCategories
} from "../../../features/categories/categoriesSlice";

import { Category } from "../../../interfaces/Category";

const EditManagement: React.FC = (): JSX.Element => {
   const dispatch = useDispatch();

   const isEditMode: boolean = useSelector((state: RootStateOrAny) => state.categories.isEditMode);
   const isAddingNewCategory: boolean = useSelector((state: RootStateOrAny) => state.categories.isAddingNewCategory);
   const isEditingCategory: boolean = useSelector((state: RootStateOrAny) => state.categories.isEditingCategory);
   const isChooseAllCategories: boolean = useSelector((state: RootStateOrAny) => state.categories.isChooseAllCategories);

   const categories: Category[] = useSelector((state: RootStateOrAny) => state.categories.categoriesArray);
   const temporaryCategories: Category[] = useSelector((state: RootStateOrAny) => state.categories.categoriesTemporaryArray);

   const chooseAllCategoriesForEdit = () :void => {
      if (!isChooseAllCategories) {
         dispatch(setChooseAllCategories(true));
      } else if (isChooseAllCategories) {
         dispatch(setChooseAllCategories(false));
      }
   }

   const addNewCategory = (): void => {
      dispatch(setAddingNewCategory(true));
   }

   const doneNewCategory = (): void => {
      dispatch(setAddingNewCategory(false));
      dispatch(setCategories([...temporaryCategories]));
      alert('Your changes were saved');
   }

   const buttonsEdit = (): JSX.Element => {
      return (
         <>
            <button onClick={chooseAllCategoriesForEdit}
               disabled={isAddingNewCategory || isEditingCategory}
               className={!(isAddingNewCategory || isEditingCategory) ?
                (isChooseAllCategories ? 'categories-change__buttonAll on' : 'categories-change__buttonAll off') : 
                 "categories-change__buttonAll"}>
                  All
            </button>
            <button className={!(isAddingNewCategory || isEditingCategory) ? '' : "unactivated"}
               onClick={addNewCategory}
               disabled={isAddingNewCategory || isEditingCategory}>
                  <i>
                     <PlusIcon/>
                  </i>
            </button>
            <button className={!(isAddingNewCategory || isEditingCategory) ? '' : "unactivated"}
               onClick={doneNewCategory}
               disabled={isAddingNewCategory || isEditingCategory}>
                  <i>
                     <CheckIcon/>
                  </i>
            </button>
         </>
      )
   }

   const handleCorrect = (): void => {
      dispatch(setEditMode(true));
      dispatch(setTemporaryCategories([...categories]));
   }

   const buttonToEdit = (): JSX.Element => {
      return (
         <>
            <button onClick={handleCorrect}>
               <i>
                  <PensilIcon/> 
               </i>
            </button>
         </>
      )
   }

   const showInfo = (): void => {
      console.log("here information");
   }

   return (
      <div className='popup__categories-change'>
         <p>Categories</p>
         {isEditMode ? buttonsEdit() : buttonToEdit()}
         <button className={!(isAddingNewCategory || isEditingCategory) ?
               'categories-change__info' :
               'categories-change__info unactivated'} 
               disabled={isAddingNewCategory || isEditingCategory}
               onClick={showInfo}>
            <i>
               <InfoIcon/>
            </i>
         </button>
      </div>
   )
}

export default EditManagement;