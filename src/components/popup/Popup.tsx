import React from 'react';
import {useSelector, RootStateOrAny} from 'react-redux';

import { Categories } from '../../interfaces/Categories';

import PopupAddAndEditBlock from './popupAddAndEditBlock/PopupAddAndEditBlock';
import { PopupName } from './popupName/PopupName';
import { PopupCategories } from './popupCategories/popupCategories';
import PopupEditCategories from './popupEditCategories/PopupEditCategories';



const Popup:React.FC = () => {

   const categories:Array<Categories> = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);
   const toCorrect:boolean = useSelector((state : RootStateOrAny) => state.categories.correct);

   return (
      <div className="popup">
         <PopupName/>
         <PopupAddAndEditBlock/>
         {!toCorrect ? <PopupCategories categories={categories}/> : <PopupEditCategories/>}
      </div>
   )
}

export default Popup;