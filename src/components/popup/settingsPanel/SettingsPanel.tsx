import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import "./settingsPanel.scss";

import { ReactComponent as InfoIcon } from "../../../images/infoIcon.svg";

import {
    setEditMode,
    setAddingNewCategory,
    setCategories,
    setTemporaryCategories,
    setChooseAllCategories,
} from "../../../features/categories/categoriesSlice";

import { Category } from "../../../interfaces/Category";

import ButtonEditModeOn from "./buttonEditModeOn/ButtonEditModeOn";
import ButtonsEdit from "./buttonsEdit/ButtonsEdit";

const EditManagement: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();

    const isEditMode: boolean = useSelector(
        (state: RootStateOrAny) => state.categories.isEditMode
    );
    const isAddingNewCategory: boolean = useSelector(
        (state: RootStateOrAny) => state.categories.isAddingNewCategory
    );
    const isEditingCategory: boolean = useSelector(
        (state: RootStateOrAny) => state.categories.isEditingCategory
    );
    const isChooseAllCategories: boolean = useSelector(
        (state: RootStateOrAny) => state.categories.isChooseAllCategories
    );

    const categories: Category[] = useSelector(
        (state: RootStateOrAny) => state.categories.categoriesArray
    );
    const temporaryCategories: Category[] = useSelector(
        (state: RootStateOrAny) => state.categories.categoriesTemporaryArray
    );

    const chooseAllCategoriesForEdit = (): void => {
        isChooseAllCategories
            ? dispatch(setChooseAllCategories(false))
            : dispatch(setChooseAllCategories(true));
    };

    const addNewCategory = (): void => {
        dispatch(setAddingNewCategory(true));
    };

    const checkChanges = (): void => {
        dispatch(setAddingNewCategory(false));
        dispatch(setCategories(temporaryCategories));
        alert("Your changes were saved");
    };

    const editModeOn = (): void => {
        dispatch(setEditMode(true));
        dispatch(setTemporaryCategories([...categories]));
    };

    const renderEditButtons = (): JSX.Element => {
        return (
            <>
                {isEditMode ? (
                    <ButtonsEdit
                        allButtonToDo={chooseAllCategoriesForEdit}
                        isDisabled={isAddingNewCategory || isEditingCategory}
                        switcher={isChooseAllCategories}
                        plus={addNewCategory}
                        check={checkChanges}
                    />
                ) : (
                    <ButtonEditModeOn onClickToDo={editModeOn} />
                )}
            </>
        );
    };

    const showInfo = (): void => {
        console.log("here information");
    };

    return (
        <div className="popup__settingsPanel">
            <p>Categories</p>
            {renderEditButtons()}
            <button
                className={`settingsPanel__info ${
                    isAddingNewCategory || isEditingCategory
                        ? "unactivated"
                        : ""
                }`}
                disabled={isAddingNewCategory || isEditingCategory}
                onClick={showInfo}
            >
                <i>
                    <InfoIcon />
                </i>
            </button>
        </div>
    );
};

export default EditManagement;
