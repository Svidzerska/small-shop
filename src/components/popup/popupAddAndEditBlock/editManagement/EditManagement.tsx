import React, { useEffect } from "react";
import './editManagement.scss';
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";



import { ReactComponent as Pensil } from '../../../../images/pensilIcon.svg';
import { ReactComponent as Info } from '../../../../images/infoIcon.svg';
import { ReactComponent as Plus } from '../../../../images/plusIcon.svg';
import { ReactComponent as Check } from '../../../../images/checkIcon.svg';




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
               className={!(isAddNewCategory || editingCurrentCategory) ?
                (toChooseAll ? 'categories-change__buttonAll on' : 'categories-change__buttonAll off') : 
                 "categories-change__buttonAll"}>
                  All
            </button>
            <button className={!(isAddNewCategory || editingCurrentCategory) ? '' : "unactivated"}
               onClick={addNewCategory}
               disabled={isAddNewCategory || editingCurrentCategory}>
                  <i>
                     <Plus/>
                  </i>
            </button>
            <button className={!(isAddNewCategory || editingCurrentCategory) ? '' : "unactivated"}
               onClick={doneNewCategory}
               disabled={isAddNewCategory || editingCurrentCategory}>
                  <i>
                     <Check/>
                  </i>
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
               <i>
                  <Pensil/> 
               </i>
            </button>
         </>
      )
   }

   const showInfo = ():void => {
      console.log("here information");
   }

      return (
         <div className='popup__categories-change'>
            <p>Categories</p>
            {toCorrect ? buttonsEdit() : buttonToEdit()}
            <button className={!(isAddNewCategory || editingCurrentCategory) ?
                'categories-change__info' :
                 'categories-change__info unactivated'} 
                 onClick={showInfo}>
               <i>
                  <Info/>
               </i>
            </button>
         </div>
      )
}