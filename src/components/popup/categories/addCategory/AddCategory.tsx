import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import {
  setAddingNewCategory,
  setTemporaryCategories,
  setChooseAllCategories,
} from "../../../../features/categories/categoriesSlice";

import { Category } from "../../../../interfaces/Category";

import EditField from "../utilityComponents/editField/EditField";

const AddCategory: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const isAddingNewCategory: boolean = useSelector((state: RootStateOrAny) => state.categories.isAddingNewCategory);
  const temporaryCategories: Category[] = useSelector(
    (state: RootStateOrAny) => state.categories.categoriesTemporaryArray
  );

  const [value, setValue] = useState<string>("New Category");
  const [charAmountLeft, setCharAmountLeft] = useState<number>(20 - value.length);

  useEffect(() => {
    if (value === "New Category") {
      setCharAmountLeft(20 - value.length);
    }
  }, [value]);

  // set New Category after canceling of editing
  useEffect(() => {
    setValue("New Category");
  }, [isAddingNewCategory]);

  const selectRange = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
  };

  const editNewCategoryInputField = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.length <= 20) {
      setValue(e.currentTarget.value);
      setCharAmountLeft(20 - e.currentTarget.value.length);
    }
  };

  const doneNewCategory = (): void => {
    const currentCategories: Category[] = [...temporaryCategories];

    const secondElementCategory: Category | undefined = currentCategories.find((item) => item.name === value);

    if (value !== "" && value !== "New Category" && !secondElementCategory) {
      currentCategories.unshift({ id: Math.random(), name: value });
      dispatch(setChooseAllCategories(false));
    }

    dispatch(setTemporaryCategories(currentCategories));
    dispatch(setAddingNewCategory(false));

    setValue("New Category");
  };

  const cancelNewCategory = (): void => {
    dispatch(setAddingNewCategory(false));
    setValue("New Category");
  };

  return (
    <>
      {isAddingNewCategory && (
        <EditField
          value={value}
          onChangeToDo={editNewCategoryInputField}
          onFocusToDo={selectRange}
          check={doneNewCategory}
          cancel={cancelNewCategory}
          charAmountLeft={charAmountLeft}
        />
      )}
    </>
  );
};

export default AddCategory;
