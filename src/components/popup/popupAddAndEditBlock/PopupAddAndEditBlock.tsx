import React, {useEffect, useState} from 'react';
import './popupAddAndEditBlock.scss';


import { ReactComponent as Check } from '../../../images/checkIcon.svg';
import { ReactComponent as XMarkInSquare } from  '../../../images/squareXmarkIcon.svg';



import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import { Categories } from '../../../interfaces/Categories';

import {
   setToAddNewCategory, 
   setTemporaryCategories,
   setChooseAll
} from '../../../features/products/categoriesSlice';


import { EditManagement } from './editManagement/EditManagement';



const PopupAddAndEditBlock:React.FC = () => {
   const dispatch = useDispatch();

   const isAddNewCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.toAddNewCategory);
   const [isInputValue, setIsInputValue] = useState<string>("New Category");
   const [charAmountLeft, setCharAmountLeft] = useState<number>(20);
   const [editInputField, setEditInputField] = useState<boolean>(false);
   

   const temporaryCategories:Array<Categories> = useSelector((state : RootStateOrAny) => state.categories.categoriesTemporaryArray);
   

   // set New Category after canceling of editing
   useEffect(() => {
      setIsInputValue("New Category");
   }, [isAddNewCategory]);

   const selectRange = (e:any):void => {
      e.currentTarget.setSelectionRange(0,e.currentTarget.value.length,);
   }
 
   const editInputNewCategory = (e: any):void => {
      setEditInputField(true);
      if (e.currentTarget.value.length <= 20) {
         setIsInputValue(e.currentTarget.value);
         setCharAmountLeft(20-e.currentTarget.value.length);
      }
   }

   const doneInputNewCategory = ():void => {
      const existingCategories = [...temporaryCategories];
      const secondElementCategory = existingCategories.find((item) => item.name === isInputValue);

      if (isInputValue !== "" && isInputValue !== "New Category" && !secondElementCategory) {
         existingCategories.unshift({id: `${Math.random()}`, name: isInputValue});
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

   const renderAddCategoryField = () => {
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
                     <Check />
                  </i>
               </button>
               <button className='addField__buttonResult' onClick={cancelInputNewCategory}>
                  <i>
                     <XMarkInSquare />
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