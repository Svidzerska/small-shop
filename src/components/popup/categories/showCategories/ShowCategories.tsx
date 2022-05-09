import React, { useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";

import "./showCategories.scss";

import { Category } from "../../../../interfaces/Category";

const ShowCategories: React.FC = (): JSX.Element => {
  const categories: Category[] = useSelector((state: RootStateOrAny) => state.categories.categoriesArray);

  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const targetValue: string = e.currentTarget.value;

    const checkActiveCategory = activeCategories.includes(e.currentTarget.value);
    checkActiveCategory
      ? setActiveCategories(activeCategories.filter((item) => item !== targetValue))
      : setActiveCategories((arr) => [...arr, `${targetValue}`]);
  };

  const displayCategories: JSX.Element[] = categories.map((category: Category) => {
    return (
      <li key={category.id}>
        <button
          onClick={chooseCategory}
          className={
            activeCategories.find((item) => item === category.name)
              ? "categories-name__button active"
              : "categories-name__button"
          }
          value={category.name}
        >
          {category.name}
        </button>
      </li>
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
          className={activeCategories.length === 0 ? "categories-name__button active" : "categories-name__button"}
        >
          All
        </button>
      </li>
      {displayCategories}
    </ul>
  );
};

export default ShowCategories;
