import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./header.scss";

import { ReactComponent as BurgerIcon } from "../../../images/burgerIcon.svg";

import { getProducts } from "../../../features/products/productsSlice";
import { getCategories } from "../../../features/categories/categoriesSlice";

const Header: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <header className="header">
      <h1>Shop</h1>
      <button onClick={getProducts}>
        <i>
          <BurgerIcon />
        </i>
      </button>
    </header>
  );
};

export default Header;
