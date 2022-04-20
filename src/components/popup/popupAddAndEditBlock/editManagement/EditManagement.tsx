import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import pensil from '../../../../images/square-pen-solid.svg';
import info from '../../../../images/info-solid.svg';
import plus from '../../../../images/plus-square-fill.svg';
import check from '../../../../images/square-check-solid.svg';


import { setCorrect } from "../../../../features/products/categoriesSlice";
import { setToAddNewCategory,setEditingCategory,setCategories } from "../../../../features/products/categoriesSlice";
import { Categories } from "../../../../interfaces/Categories";


interface Props {
   inputValue: string
}


export const EditManagement : React.FC<Props> = (props):JSX.Element => {

   const dispatch = useDispatch();
   const toCorrect:boolean = useSelector((state : RootStateOrAny) => state.categories.correct);
   const editingCategoryFromStore:boolean = useSelector((state: RootStateOrAny) => state.categories.editingCategory);

   const categories:Array<Categories> = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);



   const chooseAllFirstButton = ():void => {
      console.log(categories);
   }

   const addNewCategory = ():void => {
      dispatch(setToAddNewCategory(true));
      dispatch(setEditingCategory(true));
      // dispatch(setAddingCategory(true));
   }

   const doneNewCategory = ():void => {
      dispatch(setToAddNewCategory(false));

      const categoriesInput = [...categories];

      if (categoriesInput[0].name !== props.inputValue &&
          categoriesInput[0].name !== "" &&
          props.inputValue !== "") {
         categoriesInput.unshift({id: `${Math.random()}`, name: props.inputValue});
         dispatch(setCategories(categoriesInput));
      }
      // dispatch(setAddingCategory(false));
   }


   const buttonsEdit = ():JSX.Element => {
      return (
         <>
            <button onClick={chooseAllFirstButton}
               disabled={!editingCategoryFromStore ? false : true}
               className='categories-change__buttonAll'>All</button>
            <button className={!editingCategoryFromStore ? '' : "unactivated"}
               onClick={addNewCategory}
               disabled={!editingCategoryFromStore ? false : true}>
                  <img src={plus} alt="" />
            </button>
            <button className={!editingCategoryFromStore ? '' : "unactivated"}
               onClick={doneNewCategory}
               disabled={!editingCategoryFromStore ? false : true}>
                  <img src={check} alt="" />
            </button>
         </>
      )
   }

   const handleCorrect = ():void => {
      dispatch(setCorrect(true));
   }

   const buttonToEdit = (): JSX.Element => {
      return (
         <>
            <button onClick={handleCorrect}>
               <img src={pensil} alt="" />
            </button>
         </>
      )
   }

      return (
         <div className='popup__categories-change'>
            <p>Categories</p>
            {toCorrect ? buttonsEdit() : buttonToEdit()}
            <p className={!editingCategoryFromStore ? 'categories-change__info' : 'categories-change__info unactivated'}>
               <img src={info} alt="" />
            </p>
         </div>
      )
}