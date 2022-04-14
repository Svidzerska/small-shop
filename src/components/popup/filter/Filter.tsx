import React, {useEffect, useState} from 'react';
import './filter.scss';

import Edit from '../edit/Edit';

import arrowRight from '../../../images/arrow-left-solid.svg';
import pensil from '../../../images/square-pen-solid.svg';
import info from '../../../images/info-solid.svg';
import cross from '../../../images/xmark-solid.svg';
import plus from '../../../images/plus-square-fill.svg';
import check from '../../../images/square-check-solid.svg';
import xmark from '../../../images/square-xmark-solid.svg';


import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import { setPopup } from '../../../features/products/productSlice';
import { setCorrect, setCategories, setEditCategory, setAddCategory } from '../../../features/products/categoriesSlice';


import { Categories } from '../../../interfaces/Categories';



const Filter:React.FC = () => {
   const dispatch = useDispatch();

   const categories:Array<Categories> = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);
   const toCorrect:boolean = useSelector((state : RootStateOrAny) => state.categories.correct);
   const editCategoryFromStore:boolean = useSelector((state: RootStateOrAny) => state.categories.editCategory);


   const [isActiveCategory, setIsActiveCategory] = useState<Array<string>>([]); 
   const [isAddNewCategory, setIsAddNewCategory] = useState<boolean>(false);
   const [isInputValue, setIsInputValue] = useState<string>("");


   useEffect(() => {
      if (isActiveCategory.length === categories.length) {
         setIsActiveCategory([]);
      }
   }, [isActiveCategory.length]);


   const closePopup = () => {
      dispatch(setPopup(false));
   }

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

   const chooseAll = ():void => {
      setIsActiveCategory([]);
   }

   const handleCorrect = ():void => {
      dispatch(setCorrect(true));
   }

   const closeCorrection = ():void => {
      dispatch(setCorrect(false));
      setIsAddNewCategory(false);
      dispatch(setEditCategory(false));
      dispatch(setAddCategory(false));
   }

   const addNewCategory = () => {
      console.log("addNewCategory");
      setIsAddNewCategory(true);
      dispatch(setEditCategory(true));
      dispatch(setAddCategory(true));
   }

   const doneNewCategory = () => {
      console.log("doneNewCategory");
      setIsAddNewCategory(false);

      const categoriesInput = [...categories];

      console.log(categoriesInput[0].name);
      console.log(isInputValue);

      if (categoriesInput[0].name !== isInputValue && categoriesInput[0].name !== "") {
         categoriesInput.unshift({id: `${Math.random()}`, name: isInputValue, warning: ""});
         dispatch(setCategories(categoriesInput));
      }
      dispatch(setAddCategory(false));
   }

   const doneInputNewCategory = () => {
      if (isInputValue === "") {
         setIsInputValue("New Category");
      }
      dispatch(setEditCategory(false));
   }

   const cancelInputNewCategory = () => {
      setIsAddNewCategory(false);
      dispatch(setEditCategory(false));
      dispatch(setAddCategory(false));
   }

   const editNewCategory = (e: any) => {
      setIsInputValue(e.currentTarget.value);
   }

 
   const buttonsEdit = ():JSX.Element => {
      return (
         <>
            <button onClick={chooseAll}
               disabled={!editCategoryFromStore ? false : true}
               className='categories-change__buttonAll'>All</button>
            <button className={!editCategoryFromStore ? '' : "unactivated"}
               onClick={addNewCategory}
               disabled={!editCategoryFromStore ? false : true}>
                  <img src={plus} alt="" />
            </button>
            <button className={!editCategoryFromStore ? '' : "unactivated"}
               onClick={doneNewCategory}
               disabled={!editCategoryFromStore ? false : true}>
                  <img src={check} alt="" />
            </button>
         </>
      )
   }

   const displayCategories:JSX.Element[] = categories.map((category: Categories) => {
      return (
         <div key={category.id}>
         {category.warning !== "" ?
          <p className='category-warning'>{category.warning}</p> :
          <button
          onClick={chooseCategory}
          className={isActiveCategory.find(item => item === category.name)  ?
             'categories-name__button active' :
             'categories-name__button'}
          value={category.name}>
          {category.name}
         </button>}
         </div>
      )
   })


   const renderPopupCategories = ():JSX.Element => {
      return (
      <div className='popup__categories-name'>
            <button onClick={chooseAll}
             className={isActiveCategory.length === 0 ? 'categories-name__button active' : 'categories-name__button'}>All</button>
            {displayCategories}
      </div>
      )
   }

   const renderAddCategoryField = () => {
      return (
         <div className='addField'>
            <button className='categories-name__button'>
               <input defaultValue="New Category" onChange={editNewCategory} className="inputForEdit" autoFocus/> 
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
      <div className="popup">
         <div className='popup__name'>
            <button onClick={!toCorrect ? closePopup : closeCorrection}>
               <img src={!toCorrect ? arrowRight : cross} alt="" />
            </button>
            <p>Filter</p>
         </div>
         {toCorrect ? <div className='popup__comments'>
            <p>Categories editing</p>
         </div> : <></>}
         <div className='popup__categories-change'>
            <p>Categories</p>
            {toCorrect ? buttonsEdit() : 
             <button onClick={handleCorrect}>
               <img src={pensil} alt="" />
            </button>}
            <p className={!editCategoryFromStore ? 'categories-change__info' : 'categories-change__info unactivated'}>
               <img src={info} alt="" />
            </p>
         </div>
         {isAddNewCategory ? renderAddCategoryField() : ""}
         {!toCorrect ? renderPopupCategories() : <Edit/>}
      </div>
   )
}

export default Filter;