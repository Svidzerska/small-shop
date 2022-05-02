import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import './popupName.scss';

import {ReactComponent as ArrowLeftIcon} from '../../../images/arrowLeftIcon.svg';
import {ReactComponent as XMarkIcon} from '../../../images/xmarkIcon.svg';

import { setPopup } from "../../../features/products/productSlice";
import {
   setEditMode,
   setEditingCategory,
   setToAddNewCategory,
   setChooseAll
} from "../../../features/products/categoriesSlice";

const PopupName:React.FC = ():JSX.Element => {
   const dispatch = useDispatch();

   const isEditMode:boolean = useSelector((state : RootStateOrAny) => state.categories.editMode);

   const closePopup = ():void => {
      dispatch(setPopup(false));
   }

   const closeCorrection = ():void => {
      dispatch(setEditMode(false));
      dispatch(setToAddNewCategory(false));
      dispatch(setEditingCategory(false));
      dispatch(setChooseAll(false));
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

export default PopupName;