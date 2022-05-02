import React, {useState} from 'react';
import {useSelector, RootStateOrAny} from 'react-redux';

import './showCategories.scss';

import { Category } from '../../../../interfaces/Category';

const ShowCategories:React.FC = ():JSX.Element => {
   const categories:Category[] = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);

   const [isActiveCategories, setIsActiveCategories] = useState<string[]>([]);

   const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>):void => {
      const currentActiveCategories:string[] = [...isActiveCategories];
      const targetValue:string = e.currentTarget.value;

      const checkActiveCategory = currentActiveCategories.includes(e.currentTarget.value);

      if (checkActiveCategory) {
         setIsActiveCategories((arr) => {
            const categoriesWithoutDeleteElement:string[] = currentActiveCategories.filter(item => item !== targetValue);
            return categoriesWithoutDeleteElement;
         }); 
      } else {
         setIsActiveCategories(arr => [...arr, `${targetValue}`]);
      }
   }

   const displayCategories: JSX.Element[] = categories.map((category: Category) => {
      return (
         <li key={category.id}>
            <button
               onClick={chooseCategory}
               className={isActiveCategories.find(item => item === category.name) ?
                  'categories-name__button active' :
                  'categories-name__button'}
               value={category.name}>
               {category.name}
            </button>
         </li>
      )
   })

   const chooseAll = ():void => {
      setIsActiveCategories([]);
   }
   
   return (
      <ul className='popup__categories-name'>
         <li>
            <button onClick={chooseAll}
               className={isActiveCategories.length === 0 ? 'categories-name__button active' : 'categories-name__button'}>All</button>
         </li>
         {displayCategories}
      </ul>
   )
}

export default ShowCategories;