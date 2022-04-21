import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import { setPopup } from "../../../features/products/productSlice";
import {
   setCorrect,
   setEditingCategory,
   setToAddNewCategory,
   setChooseAll
} from "../../../features/products/categoriesSlice";

import arrowRight from '../../../images/arrow-left-solid.svg';
import cross from '../../../images/xmark-solid.svg';


export const PopupName : React.FC = (): JSX.Element => {
   const dispatch = useDispatch();
   const toCorrect:boolean = useSelector((state : RootStateOrAny) => state.categories.correct);


const closePopup = () => {
   dispatch(setPopup(false));
}

const closeCorrection = ():void => {
   dispatch(setCorrect(false));
   dispatch(setToAddNewCategory(false));
   dispatch(setEditingCategory(false));
   dispatch(setChooseAll(false));
}


   return (
      <>
         <div className='popup__name'>
            <button onClick={!toCorrect ? closePopup : closeCorrection}>
               <img src={!toCorrect ? arrowRight : cross} alt="" />
            </button>
            <h1>Filter</h1>
         </div>
         {toCorrect ? <div className='popup__comments'>
            <p>Categories editing</p>
         </div> : null}
      </>
   )
}