import React, {useEffect, useState} from 'react';
import './filter.scss';

import Edit from '../edit/Edit';


import pensil from '../../../images/square-pen-solid.svg';
import info from '../../../images/info-solid.svg';
import plus from '../../../images/plus-square-fill.svg';
import check from '../../../images/square-check-solid.svg';
import xmark from '../../../images/square-xmark-solid.svg';


import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';

import {
   setCorrect,
   setCategories,
   setEditingCategory,
   setAddingCategory,
   setToAddNewCategory
} from '../../../features/products/categoriesSlice';


import { Categories } from '../../../interfaces/Categories';

import { PopupName } from '../popupName/PopupName';



const Filter:React.FC = () => {
   const dispatch = useDispatch();

   const categories:Array<Categories> = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);
   const toCorrect:boolean = useSelector((state : RootStateOrAny) => state.categories.correct);
   const editingCategoryFromStore:boolean = useSelector((state: RootStateOrAny) => state.categories.editingCategory);
   const isAddNewCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.toAddNewCategory);


   const [isActiveCategory, setIsActiveCategory] = useState<Array<string>>([]);    
   const [isInputValue, setIsInputValue] = useState<string>("");


   useEffect(() => {
      if (isActiveCategory.length === categories.length) {
         setIsActiveCategory([]);
      }
   }, [isActiveCategory.length]);


   //////

   const chooseAllFirstButton = ():void => {
      console.log(categories);
   }

   const addNewCategory = () => {
      dispatch(setToAddNewCategory(true));
      dispatch(setEditingCategory(true));
      dispatch(setAddingCategory(true));
   }

   const doneNewCategory = () => {
      dispatch(setToAddNewCategory(false));

      const categoriesInput = [...categories];

      if (categoriesInput[0].name !== isInputValue &&
          categoriesInput[0].name !== "" &&
          isInputValue !== "") { //isInputValueAsProps
         categoriesInput.unshift({id: `${Math.random()}`, name: isInputValue});
         dispatch(setCategories(categoriesInput));
      }
      dispatch(setAddingCategory(false));
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

   //////

   const handleCorrect = ():void => {
      dispatch(setCorrect(true));
   }

   const buttonsToEdit = (): JSX.Element => {
      return (
         <>
            <button onClick={handleCorrect}>
               <img src={pensil} alt="" />
            </button>
         </>
      )
   }

   //////

   const renderPopupCategoriesChanging = (): JSX.Element => {
      return (
         <div className='popup__categories-change'>
            <p>Categories</p>
            {toCorrect ? buttonsEdit() : buttonsToEdit()}
            <p className={!editingCategoryFromStore ? 'categories-change__info' : 'categories-change__info unactivated'}>
               <img src={info} alt="" />
            </p>
         </div>
      )
   }

   //////

   const editInputNewCategory = (e: any) => {
      setIsInputValue(e.currentTarget.value);
   }

   const doneInputNewCategory = () => {
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

   //////

   const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>):void => {
      const currentActiveCategory:string[] = [...isActiveCategory];
      const currentIndex:number = currentActiveCategory.findIndex((item => item === e.currentTarget.value));
      

      if (currentIndex !== -1) {
         setIsActiveCategory((arr) => {
            const elementDeleteCategory:string[] = [...arr]
            elementDeleteCategory.splice(currentIndex,1,);
            return elementDeleteCategory;
         }); 
      } else {
         const currentTargetValue:string = e.currentTarget.value;
         setIsActiveCategory(arr => [...arr, `${currentTargetValue}`]);
      }
   }


   const displayCategories:JSX.Element[] = categories.map((category: Categories) => {
      return (
         <div key={category.id}>
          <button
          onClick={chooseCategory}
          className={isActiveCategory.find(item => item === category.name)  ?
             'categories-name__button active' :
             'categories-name__button'}
          value={category.name}>
          {category.name}
         </button>
         </div>
      )
   })

   //////

   const chooseAll = ():void => {
      setIsActiveCategory([]);
   }

   const renderPopupCategories = ():JSX.Element => {
      return (
      <div className='popup__categories-name'>
            <button onClick={chooseAll}
             className={isActiveCategory.length === 0 ? 'categories-name__button active' : 'categories-name__button'}>All</button>
            {displayCategories}
      </div>
      )
   }



   return (
      <div className="popup">
         <PopupName/>
         {renderPopupCategoriesChanging()}
         {isAddNewCategory ? renderAddCategoryField() : ""}
         {!toCorrect ? renderPopupCategories() : <Edit/>}
      </div>
   )
}

export default Filter;