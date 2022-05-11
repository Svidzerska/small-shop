import React from "react";

import { ReactComponent as PensilIcon } from "../../../../../../images/pensilIcon.svg";
import { ReactComponent as TrashIcon } from "../../../../../../images/trashIcon.svg";

import { Category } from "../../../../../../interfaces/Category";

interface Props {
  category?: Category;
  edit: Function;
  deleteElement: Function;
  isDisabled: boolean;
}

const EditButtons: React.FC<Props> = ({ category, edit, deleteElement, isDisabled }): JSX.Element => {
  return (
    <>
      <button onClick={(e) => edit(e, category?.id)} disabled={isDisabled}>
        <i>
          <PensilIcon />
        </i>
      </button>
      <button onClick={(e) => deleteElement(e, category?.id)} disabled={isDisabled}>
        <i>
          <TrashIcon />
        </i>
      </button>
    </>
  );
};

export default EditButtons;
