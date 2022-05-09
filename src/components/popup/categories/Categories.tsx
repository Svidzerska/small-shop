import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";

import AddCategory from "./addCategory/AddCategory";
import ShowCategories from "./showCategories/ShowCategories";
import EditCategories from "./editCategories/EditCategories";

const Categories: React.FC = (): JSX.Element => {
  const isEditMode: boolean = useSelector((state: RootStateOrAny) => state.categories.isEditMode);

  return (
    <>
      <AddCategory />
      {isEditMode ? <EditCategories /> : <ShowCategories />}
    </>
  );
};

export default Categories;
