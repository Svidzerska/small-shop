import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';

import './addCategory.scss';

import { ReactComponent as CheckIcon } from '../../../../images/checkIcon.svg';
import { ReactComponent as XMarkInSquareIcon } from  '../../../../images/squareXmarkIcon.svg';

import {
   setAddingNewCategory,
   setTemporaryCategories,
   setChooseAllCategories
} from '../../../../features/categories/categoriesSlice';

import { Category } from '../../../../interfaces/Category';

const AddCategory: React.FC = (): JSX.Element => {
   const dispatch = useDispatch();

   const isAddingNewCategory: boolean = useSelector((state: RootStateOrAny) => state.categories.isAddingNewCategory);
   const temporaryCategories: Category[] = useSelector((state : RootStateOrAny) => state.categories.categoriesTemporaryArray);

   const [isInputValue, setIsInputValue] = useState<string>("New Category");
   const [charAmountLeft, setCharAmountLeft] = useState<number>(20);
   const [editInputField, setEditInputField] = useState<boolean>(false);

   // set New Category after canceling of editing
   useEffect(() => {
      setIsInputValue("New Category");
   }, [isAddingNewCategory]);

   const selectRange = (e: React.FocusEvent<HTMLInputElement>):void => {
      e.currentTarget.setSelectionRange(0,e.currentTarget.value.length,);
   }

   const editInputNewCategory = (e: React.FormEvent<HTMLInputElement>):void => {
      setEditInputField(true);
      if (e.currentTarget.value.length <= 20) {
         setIsInputValue(e.currentTarget.value);
         setCharAmountLeft(20-e.currentTarget.value.length);
      }
   }

   const doneInputNewCategory = ():void => {
      const existingCategories:Category[] = [...temporaryCategories];
      const secondElementCategory:Category | undefined = existingCategories.find((item) => item.name === isInputValue);
      if (isInputValue !== "" && isInputValue !== "New Category" && !secondElementCategory) {
         existingCategories.unshift({id: Math.random(), name: isInputValue});
         dispatch(setChooseAllCategories(false));
      }

      dispatch(setTemporaryCategories(existingCategories));
      dispatch(setAddingNewCategory(false));

      setIsInputValue("New Category");
      setEditInputField(false);
   }

   const cancelInputNewCategory = ():void => {
      dispatch(setAddingNewCategory(false));
      setIsInputValue("New Category");
      setEditInputField(false);
   }

   const renderAddCategoryField = ():JSX.Element => {
      return (
         <div className='addField'>
            <div>
               <button className='categories-name__button'>
                  <input value={isInputValue}
                     onChange={editInputNewCategory}
                     onFocus={selectRange}
                     className="inputForEdit"
                     autoFocus />
               </button>
               <button className='addField__buttonResult' onClick={doneInputNewCategory}>
                  <i>
                     <CheckIcon />
                  </i>
               </button>
               <button className='addField__buttonResult' onClick={cancelInputNewCategory}>
                  <i>
                     <XMarkInSquareIcon />
                  </i>
               </button>
            </div>
            {editInputField &&
            <p className='addField__char-amount'>{charAmountLeft} char. left</p>}
         </div>
      )
   }

   return (
      <>
         {isAddingNewCategory && renderAddCategoryField()}
      </>
   )
}

export default AddCategory;