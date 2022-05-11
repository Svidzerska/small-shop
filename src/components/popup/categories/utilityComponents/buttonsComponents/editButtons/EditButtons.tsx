import React from "react";

import { ReactComponent as PensilIcon } from "../../../../../../images/pensilIcon.svg";
import { ReactComponent as TrashIcon } from "../../../../../../images/trashIcon.svg";

import { Category } from "../../../../../../interfaces/Category";

interface Props {
  category?: Category;
  edit: Function;
  deleteElement: Function;
  className: string;
  isDisabled: boolean;
}

const EditButtons: React.FC<Props> = ({ category, edit, deleteElement, className, isDisabled }): JSX.Element => {
  return (
    <>
      <button onClick={(e) => edit(e, category?.id)} disabled={isDisabled}>
        <i className={className}>
          <PensilIcon />
        </i>
      </button>
      <button onClick={(e) => deleteElement(e, category?.id)} disabled={isDisabled}>
        <i className={className}>
          <TrashIcon />
        </i>
      </button>
    </>
  );
};

export default EditButtons;
