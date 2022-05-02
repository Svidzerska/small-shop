import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';

import './popupAddAndEditBlock.scss';

import { ReactComponent as CheckIcon } from '../../../images/checkIcon.svg';
import { ReactComponent as XMarkInSquareIcon } from  '../../../images/squareXmarkIcon.svg';

import {
   setToAddNewCategory, 
   setTemporaryCategories,
   setChooseAll
} from '../../../features/products/categoriesSlice';

import { Categories } from '../../../interfaces/Categories';

import EditManagement from './editManagement/EditManagement';

const PopupAddAndEditBlock:React.FC = ():JSX.Element => {
   const dispatch = useDispatch();

   const isAddNewCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.toAddNewCategory);
   const temporaryCategories:Categories[] = useSelector((state : RootStateOrAny) => state.categories.categoriesTemporaryArray);
   
   const [isInputValue, setIsInputValue] = useState<string>("New Category");
   const [charAmountLeft, setCharAmountLeft] = useState<number>(20);
   const [editInputField, setEditInputField] = useState<boolean>(false);
   
   // set New Category after canceling of editing
   useEffect(() => {
      setIsInputValue("New Category");
   }, [isAddNewCategory]);

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
      const existingCategories:Categories[] = [...temporaryCategories];
      const secondElementCategory:Categories | undefined = existingCategories.find((item) => item.name === isInputValue);
      if (isInputValue !== "" && isInputValue !== "New Category" && !secondElementCategory) {
         existingCategories.unshift({id: Math.random(), name: isInputValue});
         dispatch(setChooseAll(false));
      }

      dispatch(setTemporaryCategories(existingCategories));
      dispatch(setToAddNewCategory(false));

      setIsInputValue("New Category");
      setEditInputField(false);
   }

   const cancelInputNewCategory = ():void => {
      dispatch(setToAddNewCategory(false));
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
            {editInputField ? 
            <p className='addField__char-amount'>{charAmountLeft} char. left</p> : 
            null}
         </div>
      )
   }

   return (
      <>
         <EditManagement inputValue={isInputValue}/>
         {isAddNewCategory ? renderAddCategoryField() : null}
      </>
   )
}

export default PopupAddAndEditBlock;