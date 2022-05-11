import React, { useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";

import "./showCategories.scss";

import { Category } from "../../../../interfaces/Category";
import CategoryElement from "./categoryElement/CategoryElement";

const ShowCategories: React.FC = (): JSX.Element => {
  const categories: Category[] = useSelector((state: RootStateOrAny) => state.categories.categoriesArray);

  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const targetValue: string = e.currentTarget.value;
    const checkActiveCategory = activeCategories.includes(e.currentTarget.value);

    checkActiveCategory
      ? setActiveCategories((prevState) => prevState.filter((item) => item !== targetValue))
      : setActiveCategories((prevState) => [...prevState, `${targetValue}`]);
  };

  const displayCategories: JSX.Element[] = categories.map((category: Category) => {
    return (
      <CategoryElement
        key={category.id}
        category={category}
        onClickToDo={chooseCategory}
        activeCategories={activeCategories}
      />
    );
  });

  const chooseAll = (): void => {
    setActiveCategories([]);
  };

  return (
    <ul className="popup__categories-name">
      <li>
        <button
          onClick={chooseAll}
          className={`categories-name__button ${activeCategories.length === 0 ? "active" : ""}`}
        >
          All
        </button>
      </li>
      {displayCategories}
    </ul>
  );
};

export default ShowCategories;
