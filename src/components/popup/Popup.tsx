import React from 'react';
import './popup.scss';

import {useSelector, RootStateOrAny} from 'react-redux';

import { Categories } from '../../interfaces/Categories';

import PopupAddAndEditBlock from './popupAddAndEditBlock/PopupAddAndEditBlock';
import PopupName from './popupName/PopupName';
import PopupCategories from './popupCategories/PopupCategories';
import PopupEditCategories from './popupEditCategories/PopupEditCategories';



const Popup:React.FC = ():JSX.Element => {

   const categories:Categories[] = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);
   const isEditMode:boolean = useSelector((state : RootStateOrAny) => state.categories.editMode);

   return (
      <div className="popup">
         <PopupName/>
         <PopupAddAndEditBlock/>
         {!isEditMode ? <PopupCategories categories={categories}/> : <PopupEditCategories/>}
      </div>
   )
}

export default Popup;