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

      const secondElementCategory = existingCategories.find((item) => item.name === isInputValue);

      if (isInputValue !== "" && isInputValue !== "New Category" && !secondElementCategory) {
         existingCategories.unshift({id: `${Math.random()}`, name: isInputValue});
         dispatch(setChooseAll(false));
      }

      dispatch(setTemporaryCategories(existingCategories));
      dispatch(setToAddNewCategory(false));
      setIsInputValue("New Category");
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
               <i>
                  <Check/>
               </i>
            </button>
            <button className='addField__buttonResult' onClick={cancelInputNewCategory}>
               <i>
                  <XMarkInSquare/>
               </i>
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