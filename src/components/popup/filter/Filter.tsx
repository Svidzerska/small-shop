import React, {useEffect, useState} from 'react';
import './filter.scss';

import Edit from '../edit/Edit';

import arrowRight from '../../../images/arrow-left-solid.svg';
import pensil from '../../../images/square-pen-solid.svg';
import info from '../../../images/info-solid.svg';
import cross from '../../../images/xmark-solid.svg';
import plus from '../../../images/plus-square-fill.svg';
import check from '../../../images/square-check-solid.svg';

import { useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import { setPopup } from '../../../features/products/productSlice';
import { setCorrect } from '../../../features/products/categoriesSlice';


import { Categories } from '../../../interfaces/Categories';



const Filter:React.FC = () => {
   const dispatch = useDispatch();

   const categories:Array<Categories> = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);
   const toCorrect:boolean = useSelector((state : RootStateOrAny) => state.categories.correct);

   const [isActiveCategory, setIsActiveCategory] = useState<Array<string>>([]); 


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
   }

 
   const buttonsEdit = ():JSX.Element => {
      return (
         <>
            <button onClick={chooseAll}
             className='categories-change__buttonAll'>All</button>
             <button>
                <img src={plus} alt=""/>
            </button>
             <button>
                <img src={check} alt=""/>
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

   const viewPopupCategories = ():JSX.Element => {
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
            <p className='categories-change__info'>
               <img src={info} alt="" />
            </p>
         </div>
         {!toCorrect ? viewPopupCategories() : <Edit/>}
      </div>
   )
}

export default Filter;