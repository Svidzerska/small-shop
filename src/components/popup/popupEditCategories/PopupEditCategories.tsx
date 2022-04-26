import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import './popupEditCategories.scss';

import { ReactComponent as Pensil } from '../../../images/pensilIcon.svg';
import { ReactComponent as Trash } from '../../../images/trashIcon.svg';
import { ReactComponent as Check } from '../../../images/checkIcon.svg';
import { ReactComponent as XMarkInSquare } from  '../../../images/squareXmarkIcon.svg';

import { setTemporaryCategories, setEditingCategory, setChooseAll } from "../../../features/products/categoriesSlice";
import { Categories } from '../../../interfaces/Categories';


const PopupEditCategories: React.FC = ():JSX.Element => {
   const dispatch = useDispatch();

   const temporaryCategories: Array<Categories> = useSelector((state: RootStateOrAny) => state.categories.categoriesTemporaryArray);
   const isAddNewCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.toAddNewCategory);
   const toChooseAll:boolean = useSelector((state: RootStateOrAny) => state.categories.chooseAll);
   const editingCurrentCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.editingCategory);


   const [isActiveCategories, setIsActiveCategories] = useState<Array<string>>([temporaryCategories[0]?.name]);  
   const [isEditCategory, setIsEditCategory] = useState<string>("");
   const [isInputValue, setIsInputValue] = useState<string>("");
   const [charAmountLeft, setCharAmountLeft] = useState<number>(0);


   useEffect(() => {
      if (isActiveCategories.length === temporaryCategories.length) {
         dispatch(setChooseAll(true));
      }
   }, [isActiveCategories.length]);


   useEffect(() => {
      if (toChooseAll) {
         setIsActiveCategories([...temporaryCategories].map(item => item.name));
      } else if (!toChooseAll && isActiveCategories.length === temporaryCategories.length) {
         setIsActiveCategories([]);
      }
   },[toChooseAll]);


   const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>):void => {
      if (!editingCurrentCategory) { 
         const currentActiveCategories:string[] = [...isActiveCategories];
         const targetValue:string = e.currentTarget.value;

         const checkActiveCategory:boolean = currentActiveCategories.includes(e.currentTarget.value);

            if (checkActiveCategory) {
               setIsActiveCategories(() => {
                  const categoriesWithoutDeleteElement:string[] = currentActiveCategories.filter(item => item !== targetValue);
                  return categoriesWithoutDeleteElement;
               });
            } else {
               setIsActiveCategories(arr => [...arr, `${targetValue}`]);
            }
         dispatch(setChooseAll(false));
      }
   }



   const editCurrentCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setIsEditCategory(e.currentTarget.id);

      const existValue = temporaryCategories.find(item => item.id === e.currentTarget.id);
      if (existValue) {
         setCharAmountLeft(20-existValue.name.length);
         setIsInputValue(existValue.name);
      }

      dispatch(setEditingCategory(true));
   }

   const editInputCategory = (e: any): void => {
      if (e.currentTarget.value.length <= 20) {
         setIsInputValue(e.currentTarget.value);
         setCharAmountLeft(20-e.currentTarget.value.length);
      }
   }


   const deleteCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      const currentCategories:Categories[] = [...temporaryCategories];
      dispatch(setTemporaryCategories(currentCategories.filter((item) => item.id !== e.currentTarget.id)));
      
      const deleteCategory = currentCategories.find((item) => item.id === e.currentTarget.id);
      setIsActiveCategories(isActiveCategories.filter((item) => item !== deleteCategory?.name));
   }

   const doneInputCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      const categoriesInput:Categories[] = [...temporaryCategories];
      const secondElementCategory = categoriesInput.find((item) => item.name === isInputValue && item.id !== e.currentTarget.id);

      if (!secondElementCategory) {
         const currentCategory = categoriesInput.findIndex((item) => item.id === e.currentTarget.id);
         const indexActiveCategory = isActiveCategories.findIndex((item) => item === categoriesInput[currentCategory].name);
      
         categoriesInput[currentCategory] = {...categoriesInput[currentCategory], name: isInputValue};
         dispatch(setTemporaryCategories(categoriesInput)); 

         setIsActiveCategories((arr) => {
            const updateArr = [...arr];
            updateArr.splice(indexActiveCategory,1,isInputValue);
            return updateArr;
         })
      } else {
         dispatch(setTemporaryCategories(categoriesInput.filter((item) => item.id !== e.currentTarget.id)));
         const deleteCategory = categoriesInput.find((item) => item.id === e.currentTarget.id);
         setIsActiveCategories(isActiveCategories.filter((item) => item !== deleteCategory?.name));
      }
      setIsEditCategory("");
      dispatch(setEditingCategory(false));
   }

   const cancelEditCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setIsEditCategory("");
      dispatch(setEditingCategory(false));
   }


   const renderEditButtons = (category:Categories):JSX.Element => {
      return (
         <>
            <button onClick={editCurrentCategory} id={category.id} disabled={isAddNewCategory || editingCurrentCategory}>
               <i className={!(isAddNewCategory || editingCurrentCategory) ? '' : "unactivated"}>
                  <Pensil/>
               </i>
            </button>
            <button onClick={deleteCategory} id={category.id} disabled={isAddNewCategory || editingCurrentCategory}>
               <i className={!(isAddNewCategory || editingCurrentCategory) ? '' : "unactivated"}>
                  <Trash/>
               </i>
            </button>
         </>
      )
   }

   const renderDoneButtons = (category:Categories):JSX.Element => {
      return (
         <>
            <button onClick={doneInputCategory} id={category.id}>
               <i>
                  <Check/>
               </i>
            </button>
            <button onClick={cancelEditCategory} id={category.id} >
               <i>
                  <XMarkInSquare/>
               </i>
            </button>
         </>
      )
   }


   const displayCategories: JSX.Element[] = temporaryCategories.map((category: Categories) => {
      return (
         <li key={category.id}
            className={isActiveCategories.find(item => item === category.name) ? 'edit-component active' : 'edit-component'}>
                     <p>
                        <button
                           onClick={chooseCategory}
                           className={isActiveCategories.find(item => item === category.name) ? 'categories-name__button active' : 'categories-name__button'}
                           value={category.name}
                           disabled={isAddNewCategory || editingCurrentCategory}
                           id={category.id}>
                           {isEditCategory === category.id ?
                              <input
                                 id={category.id}
                                 value={editingCurrentCategory ? isInputValue : category.name}
                                 onChange={editInputCategory}
                                 className="inputForEdit"
                                 autoFocus /> :
                              category.name}
                        </button>
                           {isActiveCategories.find(item => item === category.name) &&
                            editingCurrentCategory &&
                            isEditCategory === category.id ? 
                           <p className='edit-component__char-amount'>{charAmountLeft} char. left</p> : 
                           null}
                     </p>
                     {isActiveCategories.find(item => item === category.name) ? 
                     (isEditCategory !== "" && isEditCategory === category.id ? 
                        renderDoneButtons(category) : 
                        renderEditButtons(category)) : 
                        null}
         </li>
      )
   })


   return (
      <ul className="popup__edit-place">
         {displayCategories}
      </ul>
   )
}

export default PopupEditCategories;