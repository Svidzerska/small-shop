import React from 'react';
import { useState } from 'react';
import { useSelector, RootStateOrAny} from 'react-redux';
import { Categories } from '../../../interfaces/Categories';


interface Props {
   categories: Categories[];
}

export const PopupCategories: React.FC<Props> = (props):JSX.Element => {
   const [isActiveCategory, setIsActiveCategory] = useState<Array<string>>([]);  

   const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>):void => {
      const currentActiveCategory:string[] = [...isActiveCategory];
      const targetValue:string = e.currentTarget.value;

      const checkActiveCategory = currentActiveCategory.includes(e.currentTarget.value);

      if (checkActiveCategory) {
         setIsActiveCategory((arr) => {
            const elementDeleteCategory:string[] = [...arr];
            const categoriesWithoutDeleteElement:string[] = elementDeleteCategory.filter(item => item !== targetValue);
            return categoriesWithoutDeleteElement;
         }); 
      } else {
         setIsActiveCategory(arr => [...arr, `${targetValue}`]);
      }
   }

   const displayCategories: JSX.Element[] = props.categories.map((category: Categories) => {
      return (
         <li key={category.id}>
            <button
               onClick={chooseCategory}
               className={isActiveCategory.find(item => item === category.name) ?
                  'categories-name__button active' :
                  'categories-name__button'}
               value={category.name}>
               {category.name}
            </button>
         </li>
      )
   })

   const chooseAll = ():void => {
      setIsActiveCategory([]);
   }
   
   return (
      <ul className='popup__categories-name'>
         <li>
            <button onClick={chooseAll}
               className={isActiveCategory.length === 0 ? 'categories-name__button active' : 'categories-name__button'}>All</button>
         </li>
         {displayCategories}
      </ul>
   )
}
