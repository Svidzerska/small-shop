import React, { useState } from "react";

import "./search.scss";

import { ReactComponent as GlassIcon } from "../../../images/glassIcon.svg";

const Search: React.FC = (): JSX.Element => {
    const [value, setValue] = useState<string>("");

    const changeValue = (e: React.FormEvent<HTMLInputElement>): void => {
        setValue(e.currentTarget.value);
    };

    const searchDone = (): void => {
        console.log(value);
    };

    const searchStartEnter = (
        e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        e.key === "Enter" && searchDone();
    };

    return (
        <div className="search-field">
            <input
                placeholder="Search"
                value={value}
                onChange={changeValue}
                onKeyDown={searchStartEnter}
            />
            <button className="search-field__button-glass" onClick={searchDone}>
                <i>
                    <GlassIcon />
                </i>
            </button>
        </div>
    );
};

export default Search;
