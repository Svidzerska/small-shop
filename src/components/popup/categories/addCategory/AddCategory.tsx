import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import "./addCategory.scss";

import {
  setAddingNewCategory,
  setTemporaryCategories,
  setChooseAllCategories,
} from "../../../../features/categories/categoriesSlice";

import { Category } from "../../../../interfaces/Category";

import ConfirmButtons from "../buttonsComponents/confirmButtons/ConfirmButtons";

const AddCategory: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const isAddingNewCategory: boolean = useSelector((state: RootStateOrAny) => state.categories.isAddingNewCategory);
  const temporaryCategories: Category[] = useSelector(
    (state: RootStateOrAny) => state.categories.categoriesTemporaryArray
  );

  const [value, setValue] = useState<string>("New Category");
  const [charAmountLeft, setCharAmountLeft] = useState<number>(20);
  const [isEditInputField, setEditInputField] = useState<boolean>(false);

  // set New Category after canceling of editing
  useEffect(() => {
    setValue("New Category");
  }, [isAddingNewCategory]);

  const selectRange = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
  };

  const editNewCategoryInputField = (e: React.FormEvent<HTMLInputElement>): void => {
    setEditInputField(true);
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
    setEditInputField(false);
  };

  const cancelNewCategory = (): void => {
    dispatch(setAddingNewCategory(false));
    setValue("New Category");
    setEditInputField(false);
  };

  const renderAddCategoryField = (): JSX.Element => {
    return (
      <div className="addField">
        <div>
          <div className="addField__inputField">
            <input
              value={value}
              onChange={editNewCategoryInputField}
              onFocus={selectRange}
              className="inputForEdit"
              autoFocus
            />
          </div>
          <ConfirmButtons className="addField__buttonResult" check={doneNewCategory} cancel={cancelNewCategory} />
        </div>
        {isEditInputField && <p className="addField__char-amount">{charAmountLeft} char. left</p>}
      </div>
    );
  };

  return <>{isAddingNewCategory && renderAddCategoryField()}</>;
};

export default AddCategory;
