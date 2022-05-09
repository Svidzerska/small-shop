import React, { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import "./filter.scss";

import { ReactComponent as SlidersIcon } from "../../../images/slidersIcon.svg";

import { setPopup } from "../../../features/products/productsSlice";

import Popup from "../../popup/Popup";

const Filter: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();

    const isPopup: boolean = useSelector(
        (state: RootStateOrAny) => state.products.isPopup
    );

    const showPopup = (): void => {
        dispatch(setPopup(true));
    };

    useEffect(() => {
        document.body.style.overflow = isPopup ? "hidden" : "auto";
    }, [isPopup]);

    return (
        <>
            <button className="button-sliders" onClick={showPopup}>
                <i>
                    <SlidersIcon />
                </i>
            </button>
            {isPopup && <Popup />}
        </>
    );
};

export default Filter;
