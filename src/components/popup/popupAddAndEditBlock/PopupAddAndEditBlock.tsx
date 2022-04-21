import React, {useEffect, useState} from 'react';
import './popupAddAndEditBlock.scss';

import check from '../../../images/square-check-solid.svg';
import xmark from '../../../images/square-xmark-solid.svg';


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
   
   const temporaryCategories:Array<Categories> = useSelector((state : RootStateOrAny) => state.categories.categoriesTemporaryArray);
   

   // set New Category after canceling of editing
   useEffect(() => {
      setIsInputValue("New Category");
   }, [isAddNewCategory]);

   const selectRange = (e:any):void => {
      e.currentTarget.setSelectionRange(0,e.currentTarget.value.length,);
   }
 
   const editInputNewCategory = (e: any):void => {
      setIsInputValue(e.currentTarget.value);
   }

   const doneInputNewCategory = ():void => {
      
      const existingCategories = [...temporaryCategories];
      if (isInputValue !== "" && isInputValue !== "New Category") {
         existingCategories.unshift({id: `${Math.random()}`, name: isInputValue})
      }

      dispatch(setTemporaryCategories(existingCategories));
      dispatch(setToAddNewCategory(false));
      setIsInputValue("New Category");
      dispatch(setChooseAll(false));
   }

   const cancelInputNewCategory = ():void => {
      dispatch(setToAddNewCategory(false));
      setIsInputValue("New Category");
   }

   const renderAddCategoryField = () => {
      return (
         <div className='addField'>
            <button className='categories-name__button'>
               <input value={isInputValue}
                  onChange={editInputNewCategory}
                  onFocus={selectRange}
                  className="inputForEdit"
                  autoFocus />
            </button>
            <button className='addField__buttonResult' onClick={doneInputNewCategory}>
               <img src={check} alt="" />
            </button>
            <button className='addField__buttonResult' onClick={cancelInputNewCategory}>
               <img src={xmark} alt="" />
            </button>
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