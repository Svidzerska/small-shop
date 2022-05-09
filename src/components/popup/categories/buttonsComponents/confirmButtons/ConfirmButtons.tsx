import React from "react";

import { ReactComponent as CheckIcon } from "../../../../../images/checkIcon.svg";
import { ReactComponent as XMarkInSquareIcon } from "../../../../../images/squareXmarkIcon.svg";

import { Category } from "../../../../../interfaces/Category";

interface Props {
    category?: Category;
    className?: string;
    check: Function;
    cancel: Function;
}

const ConfirmButtons: React.FC<Props> = ({
    category,
    className,
    check,
    cancel,
}): JSX.Element => {
    return (
        <>
            <button
                className={className}
                onClick={(e) => check(e, category?.id)}
            >
                <i>
                    <CheckIcon />
                </i>
            </button>
            <button className={className} onClick={(e) => cancel(e)}>
                <i>
                    <XMarkInSquareIcon />
                </i>
            </button>
        </>
    );
};

export default ConfirmButtons;
