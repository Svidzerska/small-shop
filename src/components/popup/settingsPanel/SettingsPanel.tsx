import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import './settingsPanel.scss';

import { ReactComponent as PensilIcon } from '../../../images/pensilIcon.svg';
import { ReactComponent as InfoIcon } from '../../../images/infoIcon.svg';
import { ReactComponent as PlusIcon } from '../../../images/plusIcon.svg';
import { ReactComponent as CheckIcon } from '../../../images/checkIcon.svg';

import { setEditMode } from "../../../features/products/categoriesSlice";
import { setToAddNewCategory, setCategories, setTemporaryCategories, setChooseAll } from "../../../features/products/categoriesSlice";

import { Category } from "../../../interfaces/Category";

const EditManagement:React.FC = ():JSX.Element => {
   const dispatch = useDispatch();

   const isEditMode:boolean = useSelector((state : RootStateOrAny) => state.categories.editMode);
   const isAddNewCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.toAddNewCategory);
   const editingCurrentCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.editingCategory);
   const toChooseAll:boolean = useSelector((state: RootStateOrAny) => state.categories.chooseAll);

   const categories:Category[] = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);
   const temporaryCategories:Category[] = useSelector((state : RootStateOrAny) => state.categories.categoriesTemporaryArray);

   const chooseAllCategoriesForEdit = ():void => {
      if (!toChooseAll) {
         dispatch(setChooseAll(true));
      } else if (toChooseAll) {
         dispatch(setChooseAll(false));
      }
   }

   const addNewCategory = ():void => {
      dispatch(setToAddNewCategory(true));
   }

   const doneNewCategory = ():void => {
      dispatch(setToAddNewCategory(false));
      dispatch(setCategories([...temporaryCategories]));
      alert('Your changes were saved');
   }

   const buttonsEdit = ():JSX.Element => {
      return (
         <>
            <button onClick={chooseAllCategoriesForEdit}
               disabled={isAddNewCategory || editingCurrentCategory}
               className={!(isAddNewCategory || editingCurrentCategory) ?
                (toChooseAll ? 'categories-change__buttonAll on' : 'categories-change__buttonAll off') : 
                 "categories-change__buttonAll"}>
                  All
            </button>
            <button className={!(isAddNewCategory || editingCurrentCategory) ? '' : "unactivated"}
               onClick={addNewCategory}
               disabled={isAddNewCategory || editingCurrentCategory}>
                  <i>
                     <PlusIcon/>
                  </i>
            </button>
            <button className={!(isAddNewCategory || editingCurrentCategory) ? '' : "unactivated"}
               onClick={doneNewCategory}
               disabled={isAddNewCategory || editingCurrentCategory}>
                  <i>
                     <CheckIcon/>
                  </i>
            </button>
         </>
      )
   }

   const handleCorrect = ():void => {
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

   const showInfo = ():void => {
      console.log("here information");
   }

   return (
      <div className='popup__categories-change'>
         <p>Categories</p>
         {isEditMode ? buttonsEdit() : buttonToEdit()}
         <button className={!(isAddNewCategory || editingCurrentCategory) ?
               'categories-change__info' :
               'categories-change__info unactivated'} 
               disabled={isAddNewCategory || editingCurrentCategory}
               onClick={showInfo}>
            <i>
               <InfoIcon/>
            </i>
         </button>
      </div>
   )
}

export default EditManagement;