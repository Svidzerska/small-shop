import React, { useEffect, useState } from 'react';
import './popupEditCategories.scss';

import { ReactComponent as Pensil } from '../../../images/pensilIcon.svg';
import { ReactComponent as Trash } from '../../../images/trashIcon.svg';
import { ReactComponent as Check } from '../../../images/checkIcon.svg';
import { ReactComponent as XMarkInSquare } from  '../../../images/squareXmarkIcon.svg';

import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setTemporaryCategories, setEditingCategory, setChooseAll } from "../../../features/products/categoriesSlice";
import { Categories } from '../../../interfaces/Categories';


const PopupEditCategories: React.FC = ():JSX.Element => {
   const dispatch = useDispatch();

   const temporaryCategories: Array<Categories> = useSelector((state: RootStateOrAny) => state.categories.categoriesTemporaryArray);
   const isAddNewCategory:boolean = useSelector((state: RootStateOrAny) => state.categories.toAddNewCategory);
   const toChooseAll:boolean = useSelector((state: RootStateOrAny) => state.categories.chooseAll);


   const [isActiveCategories, setIsActiveCategories] = useState<Array<string>>([temporaryCategories[0]?.name]);  
   const [isEditCategory, setIsEditCategory] = useState<string>("");
   const [isInputValue, setIsInputValue] = useState<string>("");
   const [editInputField, setEditInputField] = useState<boolean>(false);
   const [charAmountLeft, setCharAmountLeft] = useState<number>(0);


   useEffect(() => {
      console.log(editInputField);
   }, [editInputField]);

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
      if (!editInputField) { 
         const currentActiveCategories:string[] = [...isActiveCategories];
         const targetValue:string = e.currentTarget.value;
         console.log(e.currentTarget.value);

         const checkActiveCategory = currentActiveCategories.includes(e.currentTarget.value);

            if (checkActiveCategory) {
               setIsActiveCategories(() => {
                  const categoriesWithoutDeleteElement:string[] = currentActiveCategories.filter(item => item !== targetValue);
                  return categoriesWithoutDeleteElement;
               });
            } else {
               setIsActiveCategories(arr => [...arr, `${targetValue}`]);
            }

      dispatch(setEditingCategory(false));
      dispatch(setChooseAll(false));
      }
   }



   const editCurrentCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setIsEditCategory(e.currentTarget.id);
      setEditInputField(true);

      const existValue = temporaryCategories.find(item => item.id === e.currentTarget.id);
      if (existValue) {
         setIsInputValue(existValue.name);
      }

      dispatch(setEditingCategory(true));
   }

   const editInputCategory = (e: any): void => {
      // setEditInputField(true);
      if (e.currentTarget.value.length <= 20) {
         setIsInputValue(e.currentTarget.value);
         setCharAmountLeft(20-e.currentTarget.value.length);
      }
   }


   const deleteCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      const currentCategories = [...temporaryCategories];
      dispatch(setTemporaryCategories(currentCategories.filter((item) => item.id !== e.currentTarget.id)));
      
      const deleteCategory = currentCategories.find((item) => item.id === e.currentTarget.id);
      setIsActiveCategories(isActiveCategories.filter((item) => item !== deleteCategory?.name));
   }

   const doneInputCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      const categoriesInput = [...temporaryCategories];
      console.log(categoriesInput);

      const a = categoriesInput.find((item) => item.name === isInputValue);
      console.log(a);

      if (!a) {
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
         
      }
   
      setIsEditCategory("");
      dispatch(setEditingCategory(false));

      setEditInputField(false);
   }

   const cancelEditCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setIsEditCategory("");
      dispatch(setEditingCategory(false));
      setEditInputField(false);
   }


   const renderEditButtons = (category:Categories):JSX.Element => {
      return (
         <>
            <button onClick={editCurrentCategory} id={category.id} disabled={isAddNewCategory || editInputField}>
               <i className={!(isAddNewCategory || editInputField) ? '' : "unactivated"}>
                  <Pensil/>
               </i>
            </button>
            <button onClick={deleteCategory} id={category.id} disabled={isAddNewCategory || editInputField}>
               <i className={!(isAddNewCategory || editInputField) ? '' : "unactivated"}>
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
                           disabled={isAddNewCategory || editInputField}
                           id={category.id}>
                           {isEditCategory === category.id ?
                              <input
                                 id={category.id}
                                 value={editInputField ? isInputValue : category.name}
                                 onChange={editInputCategory}
                                 className="inputForEdit"
                                 autoFocus /> :
                              category.name}
                        </button>
                           {isActiveCategories.find(item => item === category.name) &&
                            editInputField &&
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