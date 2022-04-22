import React, { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import pensil from '../../../../images/square-pen-solid.svg';
import info from '../../../../images/info-solid.svg';
import plus from '../../../../images/plus-square-fill.svg';
import check from '../../../../images/square-check-solid.svg';


import { setCorrect } from "../../../../features/products/categoriesSlice";
import { setToAddNewCategory, setCategories, setTemporaryCategories, setChooseAll } from "../../../../features/products/categoriesSlice";
import { Categories } from "../../../../interfaces/Categories";


interface Props {
   inputValue: string
}


export const EditManagement : React.FC<Props> = (props):JSX.Element => {

   const dispatch = useDispatch();
   const toCorrect:boolean = useSelector((state : RootStateOrAny) => state.categories.correct);
   const isAddNewCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.toAddNewCategory);
   const editingCurrentCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.editingCategory);
   const toChooseAll:boolean = useSelector((state: RootStateOrAny) => state.categories.chooseAll);
   

   const categories:Array<Categories> = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);
   const temporaryCategories:Array<Categories> = useSelector((state : RootStateOrAny) => state.categories.categoriesTemporaryArray);


   // useEffect(() => {
   //    console.log(isAddNewCategory || editingCurrentCategory)
   // }, [isAddNewCategory]);

   // useEffect(() => {
   //    console.log(editingCurrentCategory);
   //    console.log(isAddNewCategory || editingCurrentCategory)
   // }, [editingCurrentCategory]);

   const chooseAllCategoriesForEdit = ():void => {
      if (!toChooseAll) {
         dispatch(setChooseAll(true));
      } else if (toChooseAll) {
         dispatch(setChooseAll(false));
      }
   }

   const addNewCategory = ():void => {
      dispatch(setToAddNewCategory(true));
   }

   const doneNewCategory = ():void => {
      dispatch(setToAddNewCategory(false));
      dispatch(setCategories([...temporaryCategories]));
      alert('Your changes were saved');
   }


   const buttonsEdit = ():JSX.Element => {
      return (
         <>
            <button onClick={chooseAllCategoriesForEdit}
               disabled={isAddNewCategory || editingCurrentCategory}
               className={toChooseAll ? 'categories-change__buttonAll on' : 'categories-change__buttonAll off'}>All</button>
            <button className={!(isAddNewCategory || editingCurrentCategory) ? '' : "unactivated"}
               onClick={addNewCategory}
               disabled={isAddNewCategory || editingCurrentCategory}>
                  <img src={plus} alt="" />
            </button>
            <button className={!(isAddNewCategory || editingCurrentCategory) ? '' : "unactivated"}
               onClick={doneNewCategory}
               disabled={isAddNewCategory || editingCurrentCategory}>
                  <img src={check} alt="" />
            </button>
         </>
      )
   }

   const handleCorrect = ():void => {
      dispatch(setCorrect(true));
      dispatch(setTemporaryCategories([...categories]));
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
            <p className={!(isAddNewCategory || editingCurrentCategory) ? 'categories-change__info' : 'categories-change__info unactivated'}>
               <img src={info} alt="" />
            </p>
         </div>
      )
}