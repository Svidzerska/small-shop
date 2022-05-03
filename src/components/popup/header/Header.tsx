import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import './header.scss';

import {ReactComponent as ArrowLeftIcon} from '../../../images/arrowLeftIcon.svg';
import {ReactComponent as XMarkIcon} from '../../../images/xmarkIcon.svg';

import { setPopup } from "../../../features/products/productsSlice";
import {
   setEditMode,
   setEditingCategory,
   setToAddNewCategory,
   setChooseAllCategories
} from "../../../features/categories/categoriesSlice";

const Header:React.FC = ():JSX.Element => {
   const dispatch = useDispatch();

   const isEditMode:boolean = useSelector((state : RootStateOrAny) => state.categories.editMode);

   const closePopup = ():void => {
      dispatch(setPopup(false));
   }

   const closeCorrection = ():void => {
      dispatch(setEditMode(false));
      dispatch(setToAddNewCategory(false));
      dispatch(setEditingCategory(false));
      dispatch(setChooseAllCategories(false));
   }


   return (
      <>
         <div className='popup__name'>
            <button onClick={!isEditMode ? closePopup : closeCorrection}>
               <i>
                  {!isEditMode ? <ArrowLeftIcon/> : <XMarkIcon/>}
               </i>
            </button>
            <h1>Filter</h1>
         </div>
         {isEditMode &&
         <div className='popup__comments'>
            <p>Categories editing</p>
         </div>}
      </>
   )
}

export default Header;