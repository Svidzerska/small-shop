import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import './editCategories.scss';

import { ReactComponent as PensilIcon } from '../../../../images/pensilIcon.svg';
import { ReactComponent as TrashIcon } from '../../../../images/trashIcon.svg';
import { ReactComponent as CheckIcon } from '../../../../images/checkIcon.svg';
import { ReactComponent as XMarkInSquareIcon } from  '../../../../images/squareXmarkIcon.svg';

import { setTemporaryCategories, setEditingCategory, setChooseAllCategories } from "../../../../features/categories/categoriesSlice";

import { Category } from '../../../../interfaces/Category';

const EditCategories: React.FC = (): JSX.Element => {
   const dispatch = useDispatch();
   
   const temporaryCategories: Category[] = useSelector((state: RootStateOrAny) => state.categories.categoriesTemporaryArray);
   const isAddingNewCategory: boolean = useSelector((state: RootStateOrAny) => state.categories.isAddingNewCategory);
   const isChooseAllCategories: boolean = useSelector((state: RootStateOrAny) => state.categories.isChooseAllCategories);
   const isEditingCategory: boolean = useSelector((state: RootStateOrAny) => state.categories.isEditingCategory);

   const [activeCategories, setActiveCategories] = useState<string[]>([temporaryCategories[0]?.name]);
   const [editedCategory, setEditedCategory] = useState<string>(""); //??
   const [isInputValue, setIsInputValue] = useState<string>("");
   const [charAmountLeft, setCharAmountLeft] = useState<number>(0);

   useEffect(() => {
      if (activeCategories.length === temporaryCategories.length) {
         dispatch(setChooseAllCategories(true));
      }
   }, [activeCategories.length]);

   useEffect(() => {
      if (isChooseAllCategories) {
         setActiveCategories([...temporaryCategories].map(item => item.name));
      } else if (!isChooseAllCategories && activeCategories.length === temporaryCategories.length) {
         setActiveCategories([]);
      }
   },[isChooseAllCategories]);

   const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>):void => {
      if (!isEditingCategory) { 
         const currentActiveCategories: string[] = [...activeCategories];
         const targetValue: string = e.currentTarget.value;

         const checkActiveCategory: boolean = currentActiveCategories.includes(e.currentTarget.value);

            if (checkActiveCategory) {
               setActiveCategories(() => {
                  const categoriesWithoutDeleteElement: string[] = currentActiveCategories.filter(item => item !== targetValue);
                  return categoriesWithoutDeleteElement;
               });
            } else {
               setActiveCategories(arr => [...arr, `${targetValue}`]);
            }
         dispatch(setChooseAllCategories(false));
      }
   }

   const editCurrentCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setEditedCategory(e.currentTarget.id);

      const existValue = temporaryCategories.find(item => item.id === +e.currentTarget.id);
      if (existValue) {
         setCharAmountLeft(20-existValue.name.length);
         setIsInputValue(existValue.name);
      }

      dispatch(setEditingCategory(true));
   }

   const editInputCategory = (e: React.FormEvent<HTMLInputElement>): void => {
      if (e.currentTarget.value.length <= 20) {
         setIsInputValue(e.currentTarget.value);
         setCharAmountLeft(20-e.currentTarget.value.length);
      }
   }

   const deleteCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      const currentCategories: Category[] = [...temporaryCategories];
      dispatch(setTemporaryCategories(currentCategories.filter((item) => item.id !== +e.currentTarget.id)));
      
      const deleteCategory = currentCategories.find((item) => item.id === +e.currentTarget.id);
      setActiveCategories(activeCategories.filter((item) => item !== deleteCategory?.name));
   }

   const doneInputCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      const categoriesInput: Category[] = [...temporaryCategories];
      const secondElementCategory = categoriesInput.find((item) => item.name === isInputValue && item.id !== +e.currentTarget.id);

      if (!secondElementCategory) {
         const currentCategory = categoriesInput.findIndex((item) => item.id === +e.currentTarget.id);
         const indexActiveCategory = activeCategories.findIndex((item) => item === categoriesInput[currentCategory].name);
      
         categoriesInput[currentCategory] = {...categoriesInput[currentCategory], name: isInputValue};
         dispatch(setTemporaryCategories(categoriesInput)); 

         setActiveCategories((arr) => {
            const updateArr = [...arr];
            updateArr.splice(indexActiveCategory,1,isInputValue);
            return updateArr;
         })
      } else {
         dispatch(setTemporaryCategories(categoriesInput.filter((item) => item.id !== +e.currentTarget.id)));
         const deleteCategory = categoriesInput.find((item) => item.id === +e.currentTarget.id);
         setActiveCategories(activeCategories.filter((item) => item !== deleteCategory?.name));
      }
      setEditedCategory("");
      dispatch(setEditingCategory(false));
   }

   const cancelEditCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setEditedCategory("");
      dispatch(setEditingCategory(false));
   }

   const renderEditButtons = (category: Category): JSX.Element => {
      return (
         <>
            <button onClick={editCurrentCategory} id={`${category.id}`} disabled={isAddingNewCategory || isEditingCategory}>
               <i className={!(isAddingNewCategory || isEditingCategory) ? '' : "unactivated"}>
                  <PensilIcon/>
               </i>
            </button>
            <button onClick={deleteCategory} id={`${category.id}`} disabled={isAddingNewCategory || isEditingCategory}>
               <i className={!(isAddingNewCategory || isEditingCategory) ? '' : "unactivated"}>
                  <TrashIcon/>
               </i>
            </button>
         </>
      )
   }

   const renderDoneButtons = (category: Category): JSX.Element => {
      return (
         <>
            <button onClick={doneInputCategory} id={`${category.id}`}>
               <i>
                  <CheckIcon/>
               </i>
            </button>
            <button onClick={cancelEditCategory} id={`${category.id}`} >
               <i>
                  <XMarkInSquareIcon/>
               </i>
            </button>
         </>
      )
   }

   const displayCategories: JSX.Element[] = temporaryCategories.map((category: Category) => {
      return (
         <li key={category.id}
            className={activeCategories.find(item => item === category.name) ? 'edit-component active' : 'edit-component'}>
            <div>
               <button
                  onClick={chooseCategory}
                  className={activeCategories.find(item => item === category.name) ? 'categories-name__button active' : 'categories-name__button'}
                  value={category.name}
                  disabled={isAddingNewCategory || isEditingCategory}
                  id={`${category.id}`}>
                  {+editedCategory === category.id ?
                     <input
                        id={`${category.id}`}
                        value={isEditingCategory ? isInputValue : category.name}
                        onChange={editInputCategory}
                        className="inputForEdit"
                        autoFocus /> :
                     category.name}
               </button>
               {activeCategories.find(item => item === category.name) &&
                  isEditingCategory &&
                  +editedCategory === category.id ?
                  <p className='edit-component__char-amount'>{charAmountLeft} char. left</p> :
                  null}
            </div>
            {activeCategories.find(item => item === category.name) ?
               (editedCategory !== "" && +editedCategory === category.id ?
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

export default EditCategories;