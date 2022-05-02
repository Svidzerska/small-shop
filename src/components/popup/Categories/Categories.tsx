import React from 'react';

import {useSelector, RootStateOrAny} from 'react-redux';

import { Category } from '../../../interfaces/Category';

import AddCategory from './addCategory/AddCategory';
import ShowCategories from './showCategories/ShowCategories';
import EditCategories from './editCategories/EditCategories';

const Categories:React.FC = ():JSX.Element => {
   const categories:Category[] = useSelector((state : RootStateOrAny) => state.categories.categoriesArray);
   const isEditMode:boolean = useSelector((state : RootStateOrAny) => state.categories.editMode);

   return (
      <>
         <AddCategory/>
         {!isEditMode ? <ShowCategories categories={categories}/> : <EditCategories/>}
      </>
   )
}

export default Categories;