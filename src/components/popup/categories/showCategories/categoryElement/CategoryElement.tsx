import React from "react";

import "./categoryElement.scss";

import { Category } from "../../../../../interfaces/Category";

interface Props {
  category: Category;
  onClickToDo: Function;
  activeCategories: string[];
}

const CategoryElement: React.FC<Props> = ({ category, onClickToDo, activeCategories }): JSX.Element => {
  return (
    <li>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>): void => onClickToDo(e)}
        className={`categories-name__button ${activeCategories.find((item) => item === category.name) ? "active" : ""}`}
        value={category.name}
      >
        {category.name}
      </button>
    </li>
  );
};

export default CategoryElement;
