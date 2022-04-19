import React, {useState} from 'react';
import './popupAddAndEditBlock.scss';

import check from '../../../images/square-check-solid.svg';
import xmark from '../../../images/square-xmark-solid.svg';


import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';

import {
   setEditingCategory,
   setAddingCategory,
   setToAddNewCategory
} from '../../../features/products/categoriesSlice';


import { EditManagement } from './editManagement/EditManagement';



const PopupAddAndEditBlock:React.FC = () => {
   const dispatch = useDispatch();

   const isAddNewCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.toAddNewCategory);
   const [isInputValue, setIsInputValue] = useState<string>("");
   

   const editInputNewCategory = (e: any) => {
      setIsInputValue(e.currentTarget.value);

   }

   const doneInputNewCategory = ():void => {
      if (isInputValue === "") {
         setIsInputValue("New Category");
      }
      dispatch(setEditingCategory(false));
   }

   const cancelInputNewCategory = () => {
      dispatch(setToAddNewCategory(false));
      dispatch(setEditingCategory(false));
      dispatch(setAddingCategory(false));
   }

   const renderAddCategoryField = () => {
      return (
         <div className='addField'>
            <button className='categories-name__button'>
               <input defaultValue="New Category" onChange={editInputNewCategory} className="inputForEdit" autoFocus/> 
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